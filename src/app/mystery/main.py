import urllib.request
from bs4 import BeautifulSoup


def decode_secret_message(url):
  req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
  try:
    html_content = urllib.request.urlopen(req).read().decode("utf-8")
  except Exception as e:
    print(f"Error sa pag-access ng URL: {e}")
    return

  soup = BeautifulSoup(html_content, "html.parser")

  data = []
  table = soup.find("table")
  if table:
    rows = table.find_all("tr")
    for row in rows[1:]:
      cols = row.find_all("td")
      if len(cols) >= 3:
        # Kunin ang values base sa ayos ng table columns: [x, character, y]
        try:
          x = int(cols[0].text.strip())
          char = cols[1].text.strip()
          y = int(cols[2].text.strip())
          data.append((char, x, y))
        except ValueError:
          continue  # Laktawan kung may hindi numerong data o header error

  if not data:
    print("Walang nakitang data o table sa document.")
    return

  max_x = max(item[1] for item in data)
  max_y = max(item[2] for item in data)

  grid = [[" " for _ in range(max_x + 1)] for _ in range(max_y + 1)]

  for char, x, y in data:
    row_idx = max_y - y
    grid[row_idx][x] = char

  for row in grid:
    print("".join(row))


if __name__ == "__main__":
  doc_url = "https://docs.google.com/document/d/e/2PACX-1vSvM5gDlNvt7npYHhp_XfsJvuntUhq184By5xO_pA4b_gCWeXb6dM6ZxwN8rE6S4ghUsCj2VKR21oEP/pub"
  decode_secret_message(doc_url)
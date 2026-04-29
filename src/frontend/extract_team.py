import re

with open('about_page.html', 'r', encoding='utf-8') as f:
    content = f.read()

names = re.findall(r'class="sts_team-memebr--name"><a.*?>(.*?)</a>', content)
roles = re.findall(r'class="sts_team-memebr--description">(.*?)</div>', content)

print(f"Found {len(names)} names and {len(roles)} roles.")

with open('team_data.json', 'w', encoding='utf-8') as f:
    import json
    data = [{"name": n.strip(), "role": r.strip()} for n, r in zip(names, roles)]
    json.dump(data, f, indent=4)

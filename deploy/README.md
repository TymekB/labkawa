# Wystawienie labkawa.pl (Angular) na Mikrusie

Aplikacja jest statyczna — wystarczy zbudować ją i serwować przez nginx.
Mikrus nie daje portu 80/443 na współdzielonym IPv4, więc domenę + HTTPS
obsługuje **Cloudflare Tunnel** (ruch wychodzący, zero otwartych portów).

```
Internet → Cloudflare (SSL, labkawa.pl) → tunel → cloudflared (Mikrus) → nginx :8080
```

## 0. Warunek wstępny
Domena `labkawa.pl` musi używać DNS Cloudflare (zmiana nameserverów u rejestratora).
**Uwaga:** przy przenoszeniu DNS przepisz rekordy **MX / SPF / DKIM**, żeby nie zepsuć poczty @labkawa.pl.

## 1. Build (lokalnie albo na Mikrusie)
Dla domeny w korzeniu base-href musi być `/`:
```bash
npm ci
npm run build -- --base-href=/
# wynik: dist/labkawa/browser
```

## 2a. Wariant Docker (zalecany, jeśli Twój Mikrus wspiera Docker)
```bash
docker build -f deploy/Dockerfile -t labkawa-web .
docker run -d --restart unless-stopped --name labkawa -p 127.0.0.1:8080:80 labkawa-web
```

## 2b. Wariant bez Dockera (czysty nginx)
```bash
sudo apt install nginx
sudo cp -r dist/labkawa/browser/* /usr/share/nginx/html/
sudo cp deploy/nginx.conf /etc/nginx/conf.d/labkawa.conf   # zmień listen 80 -> 8080
sudo nginx -t && sudo systemctl reload nginx
```

## 3. Cloudflare Tunnel
```bash
# instalacja cloudflared (zależnie od architektury Mikrusa)
cloudflared tunnel login
cloudflared tunnel create labkawa
cloudflared tunnel route dns labkawa labkawa.pl
cloudflared tunnel route dns labkawa www.labkawa.pl
cp deploy/cloudflared.example.yml ~/.cloudflared/config.yml   # podmień <TUNNEL_ID>
cloudflared tunnel run labkawa      # albo jako usługa: cloudflared service install
```

## 4. Aktualizacje strony
Po zmianach: zrób nowy build i podmień pliki (Docker: przebuduj obraz i `docker restart`;
nginx: skopiuj nowy `dist` do katalogu). Najwygodniej skryptem rsync z lokalnego builda.

## Alternatywa bez Mikrusa
Najprościej: podłącz `labkawa.pl` jako custom domain w GitHub Pages (Settings → Pages),
zbuduj z `--base-href=/`, dodaj plik `CNAME` z `labkawa.pl`. GitHub daje darmowy SSL.
Wtedy serwer w ogóle nie jest potrzebny.

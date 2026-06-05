# Kadenz · Trainingsplaner

Privater Trainingsplaner für Multi-Sport-Athleten. Single-File PWA mit Drag & Drop Kalender (Woche/Monat), Sportart-Farbcodierung, Auswertung und optionaler Cloud-Sync via JSONBin.

**Sportarten:** Laufen · Trail · Wandern · Radfahren · Ergometer · Kraft · Mobilität · Yoga

## Features

- 📅 **Kalender** mit Wochen- und Monatsansicht, Drag & Drop zwischen Tagen
- ✓ **Abhaken** sperrt Einträge automatisch (nicht mehr verschiebbar, aber editierbar)
- ✏️ **Bearbeiten** per Klick auf einen Eintrag — Titel, Sportart, Dauer, Distanz
- 📊 **Plan-Volumen-Chart** unter dem Kalender (gestapelte Säulen pro Tag/Woche)
- 📈 **Auswertung** zeigt nur erledigte Trainings (Soll/Ist-Trennung)
- 💾 **Lokal-zuerst** — funktioniert komplett ohne Cloud, alles in `localStorage`
- ☁ **Optionale Cloud-Sync** via JSONBin für Sync zwischen Geräten
- ⬇⬆ **Export/Import** als JSON-Backup
- 📱 **Installierbar** als PWA, offline-fähig

## Setup auf GitHub Pages

1. Repo `TrainingPlanner` auf GitHub anlegen (oder klonen).
2. Alle Dateien dieser Ordnerstruktur ins Repo-Root pushen:
   ```
   index.html
   manifest.json
   sw.js
   icon-192.png
   icon-512.png
   ```
3. In den Repo-Settings → **Pages** → Source = `main` branch, Folder = `/` (root). Speichern.
4. Nach ~1 Minute ist die App erreichbar unter:
   `https://<dein-username>.github.io/TrainingPlanner/`

## Cloud-Sync einrichten (optional)

Die App läuft ohne Cloud-Sync — alle Daten landen lokal im Browser. Wenn du zwischen Geräten synchronisieren willst:

1. Account bei [jsonbin.io](https://jsonbin.io) anlegen (kostenlos)
2. Einen leeren Bin erstellen (Inhalt egal — wird beim ersten Sync überschrieben)
3. Bin ID kopieren (steht oben in der Bin-Detailseite)
4. Master Key kopieren (Account → API Keys → X-Master-Key)
5. In der App auf das **☁ Cloud-Badge** oben rechts klicken
6. Bin ID + Master Key eintragen → **Verbinden & laden**

Ab dann läuft Auto-Sync nach jeder Änderung (debounced, ca. 2,5s nach der letzten Änderung).

Die Zugangsdaten werden ausschließlich in deinem `localStorage` gespeichert — nicht im App-Code.

## Backup

In den Einstellungen kannst du jederzeit ein JSON-Backup deiner Daten exportieren oder einspielen. Empfehlung: regelmäßig exportieren, insbesondere bevor du Browser-Daten löschst.

## Daten-Schema

```json
{
  "version": 1,
  "updated": 1717576800000,
  "events": [
    {
      "id": 1,
      "date": "2026-06-05",
      "sport": "laufen",
      "title": "Lockerer Lauf",
      "duration": 50,
      "distance": 9,
      "done": false
    }
  ]
}
```

`sport` ist eines von: `laufen`, `trail`, `wandern`, `rad`, `ergo`, `kraft`, `mobil`, `yoga`.
`duration` ist in Minuten. `distance` in km (oder `null` bei distanzlosen Sportarten).

## Technik

- Pure HTML/CSS/JS in einer einzigen Datei (`index.html`)
- Keine Build-Tools, kein Framework
- Schriften via Google Fonts CDN (Fraunces, JetBrains Mono, Inter Tight)
- Service Worker mit stale-while-revalidate für Offline-Betrieb
- JSONBin v3 API für Cloud-Sync

## Lokale Entwicklung

Da Service Worker und PWA-Features https oder localhost erfordern:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

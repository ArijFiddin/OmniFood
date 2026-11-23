#!/usr/bin/env python3
"""Validate local image references in OmniFood HTML, CSS, and manifest files."""

from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SITE_ROOT = PROJECT_ROOT / "omnifood"
SKIP_PREFIXES = ("#", "data:", "http:", "https:", "//")


class AssetParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.references: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if tag == "img" and "src" in attributes:
            self.references.append(("img src", attributes["src"] or ""))
        if tag == "img" and "srcset" in attributes:
            for source in (attributes["srcset"] or "").split(","):
                self.references.append(("img srcset", source.strip().split(" ")[0]))
        if tag == "link" and "icon" in (attributes.get("rel") or ""):
            self.references.append(("favicon", attributes.get("href") or ""))


def is_readable_image(path: Path) -> bool:
    if not path.is_file() or path.stat().st_size == 0:
        return False
    suffix = path.suffix.lower()
    data = path.read_bytes()[:64]
    if suffix == ".svg":
        return b"<svg" in data or b"<svg" in path.read_bytes()[:1024]
    if suffix == ".webp":
        return data.startswith(b"RIFF") and data[8:12] == b"WEBP"
    return suffix in {".png", ".jpg", ".jpeg", ".gif", ".avif"}


def validate_reference(owner: Path, kind: str, reference: str) -> str | None:
    if not reference:
        return f"{owner.relative_to(PROJECT_ROOT)}: empty {kind}"
    if reference.startswith(SKIP_PREFIXES):
        return f"{owner.relative_to(PROJECT_ROOT)}: non-local {kind} ({reference})"
    target = (owner.parent / reference).resolve()
    try:
        target.relative_to(PROJECT_ROOT.resolve())
    except ValueError:
        return f"{owner.relative_to(PROJECT_ROOT)}: path escapes project ({reference})"
    if not is_readable_image(target):
        return f"{owner.relative_to(PROJECT_ROOT)}: missing or unreadable {kind} ({reference})"
    return None


def main() -> int:
    errors: list[str] = []
    checks = 0

    html_file = SITE_ROOT / "index.html"
    parser = AssetParser()
    parser.feed(html_file.read_text(encoding="utf-8"))
    for kind, reference in parser.references:
        checks += 1
        error = validate_reference(html_file, kind, reference)
        if error:
            errors.append(error)

    css_file = SITE_ROOT / "style.css"
    css_text = css_file.read_text(encoding="utf-8")
    for reference in re.findall(r"url\([\"']?([^\"')]+)[\"']?\)", css_text):
        checks += 1
        error = validate_reference(css_file, "CSS background-image", reference)
        if error:
            errors.append(error)

    manifest_file = SITE_ROOT / "manifest.webmanifest"
    for reference in re.findall(r'"src"\s*:\s*"([^"]+)"', manifest_file.read_text(encoding="utf-8")):
        checks += 1
        error = validate_reference(manifest_file, "manifest icon", reference)
        if error:
            errors.append(error)

    print(f"Checked {checks} local image references.")
    if errors:
        print("Broken references:")
        print("\n".join(f"- {error}" for error in errors))
        return 1
    print("All image references resolve to readable local files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

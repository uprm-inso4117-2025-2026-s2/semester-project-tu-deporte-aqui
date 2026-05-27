# Building Documentation (AsciiDoc)

## Prerequisite: Ruby
You need Ruby installed.

- Windows: install Ruby using RubyInstaller
- macOS: Ruby is often preinstalled, or use Homebrew
- Linux: install Ruby via your package manager

## Install dependencies (from repository root)

```bash
gem install bundler
bundle install
```

## Build HTML

```bash
bundle exec asciidoctor -o docs/index.html docs/index.adoc
```

## Build PDF

```bash
bundle exec asciidoctor-pdf -o docs/index.pdf docs/index.adoc
```

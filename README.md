# Modscript IntelliSense

Modern editing for **SBM Composer** Modscript (`.tscm`) scripts inside Visual Studio Code — a Composer Explorer, code intelligence, a searchable API reference, and project-aware tooling.

> Tip: open the in-editor guide any time with **Command Palette → `Modscript: Open Welcome`**.

---

## ✨ Features

### Code intelligence
- **Completion (IntelliSense)** — keywords, snippets, SBM API classes/functions, your variables and project symbols.
- **Usage-ranked suggestions** — classes/functions that actually appear in your scripts are offered first, ranked by how often they're used (not by unused system fields).
- **Auto-import** — picking a class/function defined in another script automatically inserts its `include("…")` at the top.
- **Signature help** — parameter hints while typing a call.
- **Hover** — type/description for the symbol under the cursor.
- **Go to Definition** (`F12` / `Ctrl`+Click), **Find All References** (`Shift`+`F12`), **Rename Symbol** (`F2`).
- **Document symbols / outline jump** (`Ctrl`+`Shift`+`O`).
- **JSDoc generator** — type `/**` above a function (full `@param`/`@returns` for class methods).
- **Snippets** — `def`, `defclass`, `class`, `forloop`, `foridx`, `whileloop`, `ifel`, `trycatch`, `tryfinally`, `switch`, `lambda`, plus SBM patterns (`getfield`, `setfield`, `loginfo`, `logerror`, `seterror`, …).

### Diagnostics ("Composer problems")
- Flags identifiers that are **not defined anywhere** in the script, its includes, or the wider repository (real typos), shown as red underlines and in the Problems panel.
- Understands declarations (`var`/`global`/`attr`, `:=`, `for (item : …)`, `catch(e)`, typed params like `def f(int x)`), comments and strings.
- Auto-covers `lib.core` globals (e.g. `VarType_Integer`) by indexing the whole repository.
- Toggle in settings.

### Composer Explorer
- Browse and open the scripts of your local SBM repository, grouped by solution.
- The active **repository name** is shown in the title (e.g. *Composer Explorer - CDT-SBM-02*).
- The application you're currently working in **auto-expands** (detected by most recently edited scripts), showing both **Javascript** and **Scripts** folders.
- **JS** and **Modscript** scripts have distinct icons.
- **Checkout / check-in aware**: checking a script out opens it automatically; a snapshot of the original is taken at checkout and restored on check-in.
- Search / fuzzy search, expand/collapse all.

### Side panels
- **Modscript Outline** — grouped, colored symbols: *Basic functions*, *Object methods* (grouped by owner), *Classes*, *Global variables*, and *Class instances* (with the methods you can call on them). Each group is toggleable; click to jump.
- **Reference Browser** — searchable, split-view reference of the full SBM API plus your own classes, functions, methods, global variables and class instances.
- **Checked Out** — every currently checked-out script; entries disappear on check-in.
- **Favourites** — star scripts for quick access (right-click a script → *Add to Favourites*).
- **Code Snippets** — named, reusable code blocks; add from a selection, click to insert, delete from the view.
- **Settings panel** — pick the repository, set the export folder and open keyboard shortcuts without editing JSON.
- **Windows Event Viewer** — view Windows event logs (Application/System/…) inside VS Code with level/text filtering, refresh and clear — no switching to the Windows tool.

---

## ⌨️ Shortcuts

| Action | Shortcut |
| --- | --- |
| Go to Definition | `F12` / `Ctrl`+Click |
| Find All References | `Shift`+`F12` |
| Rename Symbol | `F2` |
| Document Symbols | `Ctrl`+`Shift`+`O` |
| Quick Fix (auto-import) | `Ctrl`+`.` |
| Parameter hints | `Ctrl`+`Shift`+`Space` |

---

## ⚙️ Settings

| Setting | Default | Description |
| --- | --- | --- |
| `modscript.repositoryFolder` | `1` | Local Cache Path project folder to open in the Composer Explorer. |
| `modscript.exportFolder` | _none_ | Where exported scripts are saved (defaults to `Documents/SBM Composer/Imports`). |
| `modscript.enableCompletion` | `true` | Code completion (IntelliSense). |
| `modscript.enableDiagnostics` | `true` | Error checking shown as *Composer problems*. |
| `modscript.checkUndefinedVariables` | `true` | Warn about undefined variables. |
| `modscript.enableHover` | `true` | Hover tooltips. |
| `modscript.enableSignatureHelp` | `true` | Parameter hints. |

Most settings are also available from the graphical **Settings panel** (gear icon in the Composer Explorer toolbar).

---

## 🚀 Getting started

1. Set `modscript.repositoryFolder` to your Local Cache Path project number (or use the **Settings panel**).
2. Open the **Composer Explorer** from the activity bar.
3. Open a `.tscm` script and start editing — completion, diagnostics and the outline activate automatically.

> Composer does not expose a way to import scripts back automatically. Changes are saved to your export folder (default `Documents/SBM Composer/Imports/`); import them in the Composer UI. Writing changes straight back into Composer is planned.

---

## 🌍 Language

The UI follows the VS Code display language. Czech (`cs`) is supported for the main panel and command names.

---

## 🔧 Development notes

- Extension entry point: `out/extension.js`.
- Composer repository access & indexing: `out/ComposerController.js`.
- The repository is indexed (classes, functions, globals, usage frequency) to power completion ranking, auto-import and diagnostics; the index rebuilds when scripts change or the repository is switched.
- Tested against Composer 11.7. Use at your own risk.

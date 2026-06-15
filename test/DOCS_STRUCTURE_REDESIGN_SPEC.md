# DOCS_STRUCTURE.md 改訂仕様 — 設計思想3層機構の再設計

> **この文書は何?** `DOCS_STRUCTURE.md` の「設計思想3層(普遍/固有/個人)の管理機構」を、
> ①規範↔設計思想の分離 ②凍結↔可変の矛盾解消 ③OKF整合 ④メタ文書配置 の観点で再設計した**改訂仕様(ファイル書込前のdiff仕様)**です。
> まだ `DOCS_STRUCTURE.md` / `REQUIREMENTS.md` 本文には適用していません。
>
> **決定(2026-06-15)**:本仕様は保存のみ。将来適用する際、`REQUIREMENTS.md`/`DOCS_STRUCTURE.md` 自身は
> **`meta/` へ物理移動せず、文書内のツリー記述だけ更新**する(ドッグフーディングは見送り)。
>
> **生成過程**:multi-agent workflow(14エージェント・3フェーズ)。
> P1 並列調査(OKF仕様精読/現行棚卸し/外部実践/論点整理)→ P2 設計3案競争+独立審査3名 → P3 敵対的監査3観点+統合。
> **審査結果**:勝者=**案B**(3票全取り / 合計点 B=221 > C=206 > A=205)。ただし敵対的監査で大幅修整され、
> 実質は **案Bの骨格 + 案Aのファイル名方式 + 案Cの昇格経路** のハイブリッドに収束。

---

## 0. 起点となった3つの指摘

1. **設計思想3層(普遍/固有/個人)の管理機構がディレクトリ構造に見えない** — プローズ(第6章)にはあるが、ツリーから読み取れず、設計思想が4箇所(AGENTS核/CONSTITUTION凍結/PHILOSOPHY.md◇/DECISIONS)に割れている。凍結CONSTITUTIONに普遍設計思想を置くと「改善を設計哲学に反映」(REQUIREMENTS L26)と衝突。固有設計思想の**可変の器**が最小セット★に無い。
2. **`REQUIREMENTS.md`(と`DOCS_STRUCTURE.md`自身)が第4章ツリーに無い** — 付録での言及のみで、構造が自己記述的でない。
3. **OKF(Open Knowledge Format)の思想が入っていない** — 付録Cに1行あるだけ。Google Cloud が2026-06-12発表(ベンダー中立・Markdown+YAML frontmatter・1概念1ファイル・必須は`type`のみ・producer/consumer分離)。本文の設計に織り込まれていない。

---

## 1. 設計の核(監査で確定した4つの方針転換)

1. **`universal.md` は「リポ内ローカル可変・diverge許容のseed」にする**(read-only凍結+外部テンプレ往復は廃止)。
   監査1/2/3が共通して「read-onlyハッシュ凍結=元矛盾の移設にすぎず in-repo①・自己改善③・L26を破る」と高severityで指摘。
   よって普遍層も初日から `project.md` 内の「# 昇格候補(未昇格)」節で in-repo 捕捉し、`universal.md` 自体も append 可能+supersede 印にする。版ハッシュ照合・版番号一方向再配布(旧INV-8)は本テンプレのスコープ外へ◇送り。
2. **機械検証の新規追加はゼロ。** layer整合・`*.local.md`非追跡・`universal.md`ハッシュという3つの新門番チェックは全廃。
   「OKF consumer寛容(バリデータを置かない=SHED)」と「layer機械検証を足す」の自己矛盾を監査3本とも指摘。
   層の正本は『ディレクトリ+ファイル名』に一本化、frontmatter の `layer` は任意の自己記述ラベルに格下げ(OKF厳守=必須は`type`のみ)。個人層の隔離は `.gitignore` グロブ追記1点で代替。
3. **★最小セットは `project.md` 1ファイルだけに限定。** 『可変の器が★に無い』矛盾の核=固有可変容器1点を★に昇格すれば解ける。`universal.md`/`index.md` は◇に格下げ(P3最小起点・⑦過剰設計回避と両立)。`index.md`廃止し3層ナビは AGENTS.md 核の1行に一本化(SSOT)。
4. **`project.md` を reward-hacking の新チャネルにしない規範化禁止ガード。** append-only + supersede(active/superseded印)+ 規範語(MUST/禁止等)拒否 + provenance back-link 必須 + 責務境界ヘッダ。強制力は `governance/CONSTITUTION` の[機械検証]項のみ、philosophy は参考情報と明記。

**接ぎ木**:案A=`knowledge/index.md` の layer別索引概念(ただし◇)・「frontmatter付けないことでOKFバンドル外を明示」(`meta/`に適用)。案C=「[自己申告]項の governance 残留を検出して移送するゲート」概念・普遍→固有→普遍の循環を `project.md`昇格候補節+DECISIONS ADR+人間判断の三段で明記。

**INV正本の確立**:監査1の指摘(INV-1〜8がリポ内に無い=検証不能)に対応し、INV一覧表を `docs/06-reference/INVARIANTS.md` に新設、各INVに[機械検証]/[自己申告]タグと対応門番を1対1付与。

---

## 2. 新ツリー(第4章 L103-166 の改訂後)

> タグ凡例: `★`=最小セット(これだけで semi-auto 成立) `◇`=トリガー待ち `○`=AIが日常書く `◆`=人間が凍結/所有。層ラベルを併記。

```
<repo>/
│
├── AGENTS.md                         ★ 正本(SSOTの入口)。本文先頭に【クリティカル核】を全文:
│                                       ・in-repoで完結 ・evalを偽装しない ・holdoutを改変しない
│                                       ・canaryを生成物に出さない ・governance/を編集しない
│                                       ・着手前に必読セットを読む(下記)
│                                       ・必読セット = governance/GOAL.md + governance/CONSTITUTION.md
│                                                    + knowledge/philosophy-project.md
│                                       ・設計思想を知りたければ → knowledge/philosophy-*.md を読め(3層1行ナビ)
│                                       ・philosophyは【参考情報】。強制力は CONSTITUTION の[機械検証]項のみ
│                                       ・project.md 追記時は冒頭の責務境界ヘッダに従う(流儀のみ/理由はDECISIONS/進捗はSTATE)
│                                       ※AGENTS.md核は『指示』のみ。設計思想本体はphilosophyへ(参照1行)
│
├── CLAUDE.md                         ★ アダプタ:「正本=./AGENTS.md を読め」+核の同一文言
├── .github/copilot-instructions.md   ★ 同上(Copilot用)
├── .cursor/rules/00-defer-to-agents.mdc ★ 同上(Cursor用)
│   （Codexは AGENTS.md 直読でアダプタ不要 / Gemini・Clineは使い始めたら追加）
│
├── governance/                       ◆ 人間が一度だけ凍結・AI編集禁止(門番がハッシュ照合で保護)
│   ├── GOAL.md                       ★ 不変の目標(達成条件)+holdout達成宣言の禁則
│   ├── CONSTITUTION.md               ★ 強制契約のみ。各項[機械検証]タグ必須(機械が違反検知できる物だけ)
│   │                                   『なぜ/流儀/設計思想』は書かない → knowledge/philosophy-*.md へ参照1行
│   ├── MODE.md                       ★ 運用モード semi-auto(既定)/auto。昇格はADR必須
│   ├── eval/ …(run/thresholds/input_manifest/_locked/holdout/CANARY)  ◇
│   └── tools_locked/                 ◇ 門番一式(gate/curator/validate/pre-commit/driver)
│
├── eval/
│   └── run_local.*                   ★ ローカル評価エントリ(AIはこの結果で改善)
│
├── knowledge/                        ○ AIが育てる可変物。設計思想は philosophy-* バンドルとして同居
│   ├── STATE.md                      ★ 【固有層】揮発的な進捗メモのみ(全書換OK・判断理由は書かない)
│   ├── philosophy-project.md         ★ 【固有層 layer:project】このリポでAIが日常追記し育てる可変容器。
│   │                                   先頭に責務境界ヘッダ+「# 昇格候補(普遍化待ち・未昇格)」節を常設。
│   │                                   ←『可変の器が★に無い』矛盾を解く中心(★は本ファイル1点のみ)
│   ├── philosophy-universal.md       ◇ 【普遍層 layer:universal】テンプレ由来seedのコピー。
│   │                                   append可+supersede印(diverge許容/ハッシュ照合しない)。
│   │                                   空プロジェクト初日は不要(普遍は数リポ横断で立ち上がる)
│   ├── philosophy-personal.example.md ◇ 【個人層 雛形】localトークンを含まない別名なのでcommitされる。
│   │                                   実体は philosophy-*.local.md(下記・gitignore)
│   ├── index.md                      ◇ frontmatter無し。layer別索引(ファイルが2つ以上で追加・OKF任意index)
│   ├── STATE.md と並ぶ既存物 …
│   └── playbook/PLAYBOOK.md          ◇ 教訓のdelta台帳(無人化時)
│
├── provenance/
│   └── eval-log.jsonl                ◇ 1試行=1行(philosophy追記もchangeとして記録。昇格候補もここにback-link)
│
├── src/   ○ 実装本体        ├── tests/  ○ テスト
│
├── docs/                             ◆ 人間が読む『仕様(spec)』層。番号で順序付け
│   ├── 01-context/PROJECT.md ★  CONSTRAINTS.md ★
│   ├── 02-design/ARCHITECTURE.md ★
│   ├── 03-implementation/ … 05-operations/ …    ◇
│   └── 06-reference/
│       ├── DECISIONS.md              ★ 設計判断ADR(追記式・supersede)。点の決定=ここ。
│       │                              ↔ philosophy=面の流儀。DECISIONSはphilosophyを参照しない(一方向)
│       ├── INVARIANTS.md             ★ 不変条件一覧 INV-1〜INV-8(定義+[機械検証]/[自己申告]タグ+対応門番)
│       └── GLOSSARY.md               ◇ 用語集
│
├── meta/                             ◆ テンプレ自身のメタ文書(リポ固有内容ゼロ・frontmatter無し=OKFバンドル外)
│   ├── REQUIREMENTS.md               ★ テンプレ要件チェックリスト(この器の発注書)
│   └── DOCS_STRUCTURE.md             ★ この設計ガイド本体(器の設計図)
│
├── knowledge/philosophy-*.local.md   ○ 【個人層 layer:personal】個人の流儀(gitignore・ループ対象外)
├── *.local.md / *.local.*            ○ 個人メモ・個人設定(gitignore・ループ対象外)
└── .gitignore                        『*.local.*』グロブを追記(既存 CLAUDE.local.md 等は包含)
```

> **注**:案B原案のディレクトリ `knowledge/philosophy/` は採らず、案A方式の『`knowledge/` 直下にファイル名プレフィクス `philosophy-{universal|project|personal}` を並べる』に変更。
> 理由=`index.md`廃止で中間ディレクトリが情報量ゼロになり、`ls knowledge/` で3層が一覧でき、撤退は `git rm knowledge/philosophy-*` だけになる(新ディレクトリ新設という baseline 反転を最小化)。**この方針転換自体を `DECISIONS.md` に1本のADRとして起こす**(監査3指摘)。

---

## 3. 3層対応(第6章 表 L206-210 の置換)

> 見出しも『専用ディレクトリは作らず、置き場所とタグで表現』(L204)を
> 『設計思想は `knowledge/` バンドルに同居し、層をファイル名プレフィクスで明示。層は宣言ラベルで機械強制しない(OKF consumer寛容)』へ差替。

| 層 | 意味 | 物理的な置き場所(層の正本=ファイル名) | 可変性 |
|---|---|---|---|
| 普遍(プロジェクト非依存) | どのリポでも効く流儀 | `knowledge/philosophy-universal.md`(layer:universal) ◇ | append+supersede可・diverge許容seed。ハッシュ照合しない |
| プロジェクト固有 | このリポ固有の『反復的な流儀・価値観』のみ | `knowledge/philosophy-project.md`(layer:project) ★ = 固有設計思想の唯一の正本 | AIが日常追記。append-only+supersede |
| 個人 | その人だけの好み | `knowledge/philosophy-*.local.md`(layer:personal・gitignore) ○ | 各自。ループ対象外 |

- **3層がツリー第一軸で可視(INV-5)**:層の正本=ファイル名プレフィクス `philosophy-{universal|project|personal}` に1対1で焼く。`ls knowledge/` で3層が並ぶ。frontmatter `layer` は任意の自己記述ラベル(OKF: 必須は`type`のみ・`layer`は機械検証しない)。
- **固有が5箇所に散る現状(L209)の解消=ただし限定集約**:『固有の散文の流儀/なぜ』だけ `philosophy-project.md` に集約。下記は元々別責務なので移さず**参照のみ**(二重正本防止):
  - 規範語を含み機械検証可能 → `governance/CONSTITUTION.md`
  - 数値達成条件 → `governance/GOAL.md`
  - 図・モジュール構成 → `docs/02-design/ARCHITECTURE.md`
  - supersede可能な単発決定 → `docs/06-reference/DECISIONS.md`
  - 上記いずれにも当たらない反復的流儀・価値観 → `knowledge/philosophy-project.md`
  - リンクは**一方向**:`project.md` → 他4つを参照してよいが、他4つは `project.md` を参照しない(逆流禁止で二重正本を構造排除)。

---

## 4. 凍結と可変の分離(第6章 L212-221 の全面改訂)

**判定式**:凍結対象を『層』ではなく『不変性』で決める(INV-2)。判定式=**『この項目を書き換えると自己改善の審判(eval/holdout/governance)が壊れるか?』→Yesのみ凍結**。

1. **凍結側 = `governance/`(GOAL+CONSTITUTION)**。機械検証可能な強制契約だけ:eval偽装禁止・holdout改変禁止・governance改変禁止・canary禁止・in-repo完結。CONSTITUTIONの各項に[機械検証]タグ必須。[自己申告]の流儀・判断理由は物理的に追い出す(凍結区画の純化=INV-7)。
2. **可変側 = `knowledge/philosophy-*.md`**。普遍・固有とも設計思想を置きAIが追記式で進化。守りは凍結でなく『ガード付き可変』:
   - (a) append-only(全書換禁止=context collapse防止)
   - (b) supersede対応 — DECISIONSと同形。行/節に `status: active|superseded` を付け、superseded は残置・consumerはactiveのみ採用
   - (c) `provenance/eval-log.jsonl` に1行+試行IDを back-link(根拠eval差分の無い追記を門番が弾く)
   - (d) 規範化禁止ガード — `project.md` は MUST/MUST NOT/必須/禁止 等の規範modalを含む行を pre-commit で拒否
   - (e) 可視eval非悪化

**凍結↔可変矛盾の明確な解(既知矛盾の根治)**:
- 普遍層:read-onlyハッシュ凍結を廃止。`universal.md` は『初期seedコピー+以後ローカルappend(diverge許容)』。各リポで in-repo 完結のまま普遍知見を進化させられる(L26・①・③を同時に満たす)。
- 普遍化の経路(案C接ぎ木):リポ内で得た普遍候補は ①まず `philosophy-project.md` の『# 昇格候補(未昇格)』節に追記 → ②evalゲート通過後 `DECISIONS.md` にADR化 → ③人間がテンプレ原本への昇格を判断(任意・片方向export)。テンプレ原本同期は『新規リポ作成時のseed』としてのみ機能し、同期義務なし=リポ単体で hermetic。
- 版ハッシュ照合・版番号一方向再配布(旧INV-8)は本テンプレのスコープ外へ◇送り。どうしても seed 改竄検知が要る場合のみ、基準は governance でなく provenance(append専用)に『seed版タグ+導入時ハッシュ』を1行記録し、git diff ベースで判定。これは◇。
- **凍結区画の純化ゲート(案C接ぎ木)**:門番(既存validate)に『CONSTITUTION内に[自己申告]タグの項が残っていないか』の検出を1アサート追加(新規門番は作らない)。残留していれば `philosophy-*.md` への移送を促す。

---

## 5. OKFマッピング(第6章末尾 新設節)

> feel-flow取り込み表(L173-180)と同形の **ADOPT / DROP表** で記す。

| OKF要素 | 本テンプレでの扱い | 反映先 |
|---|---|---|
| bundle = .mdのディレクトリ | **ADOPT** | `knowledge/` 全体が1 OKFバンドル(manifest/DB/buildなし) |
| 1概念=1ファイル / path=Concept ID | **ADOPT** | `philosophy-universal`/`-project`/`-*.local` が各1層=1ファイル。ID=パスから`.md`除去 |
| frontmatter必須は `type` 1つのみ | **ADOPT(厳守)** | 全philosophyファイルに `type: Philosophy`。`layer`は任意(機械検証しない) |
| frontmatter 任意5フィールド(title/description/resource/tags/timestamp) | **ADOPT(任意)** | producer裁量。強制しない |
| markdownリンクでグラフ化 | **ADOPT** | `philosophy-project` → CONSTITUTION/GOAL/ARCHITECTURE/DECISIONS へ一方向リンク |
| producer/consumer分離 | **ADOPT** | producer=人間(普遍seed著者)+AI(固有を日常追記) / consumer=起動時に読むAI・人間 |
| consumer寛容(欠落/未知type/壊れリンク/index欠落で拒否しない) | **ADOPT** | バリデータ門番を置かない=SHED。layer不一致も人間レビュー止まり |
| 予約 `index.md`(frontmatter無しナビ) | **ADOPT(◇)** | `knowledge/index.md`=層別索引。ファイルが2つ以上で追加 |
| 予約 `log.md` | 不採用 | 履歴は `provenance/eval-log.jsonl` に集約 |
| Enrichment Agent(ADK+Gemini/BigQuery) | **DROP**(L57) | 採らない |
| HTML Visualizer + visualize CLI | **DROP** | 採らない |
| Pythonパッケージ / サンプルbundle | **DROP** | 採らない |
| 独自バリデータ | **DROP** | 採らない(consumer寛容に従う) |

採るのは一枚ルールのみ:『in-repoのMarkdown+frontmatter / path=identity / `type`必須+5任意 / リンクグラフ / producer-consumer分離 / consumer寛容 / 任意`index.md`』。これでベンダー中立②と in-repo①を壊さない。

**`knowledge/` の frontmatter規約**:
- 必須:`type` 1つのみ(OKF厳守)。例 `type: Philosophy` / `Decision` / `State` / `Playbook`
- 任意・推奨:`layer: universal|project|personal`(自己記述ラベル。consumerは無視可能・門番は検証しない)
- 任意:`title`/`description`/`tags`/`timestamp`(producer裁量)
- 規約違反で reject しない(consumer寛容)。他ベンダーAI(Codex/Copilot/Cursor)が `layer` 無しで書いても門番落ちしない=ベンダー中立②を保つ
- メタ文書(`meta/REQUIREMENTS.md`・`DOCS_STRUCTURE.md`)はOKFバンドル外。frontmatterを付けない(案A接ぎ木=付けないことでバンドル外を明示)

---

## 6. メタ文書配置(`meta/`)

> 第4章ツリー(L164付近)・付録A(L351-358)・REQUIREMENTS L5 の3点に反映。

- **配置**:`REQUIREMENTS.md` と `DOCS_STRUCTURE.md` を専用 `meta/` ディレクトリ(◆人間が書く・リポ固有内容ゼロ)へ移動。リポジトリ実体(governance/docs/knowledge)から物理隔離。
- **理由**:この2文書は『このプロジェクトの設計思想』ではなく『テンプレートという器そのものの発注書(REQUIREMENTS)と設計図(DOCS_STRUCTURE)』であり、3層のどれにも属さない**第6のメタ責務**(指示/手順/進捗/判断理由/強制設定のどれでもない)。philosophy-* にも docs/ にも混ぜない(責務分離⑥)。
- **統治**:人間統治・AI読むだけ(governance凍結でも knowledge可変でもない第三の扱い=人間所有の参照。案C接ぎ木)。
- **OKF関係**:frontmatterは付けない=OKFバンドル外であることを明示(案A接ぎ木)。
- **ナビ**:AGENTS.md核から1行『器の設計を知りたい人 → `meta/DOCS_STRUCTURE.md`』。中身の設計思想を知りたいAI → `knowledge/philosophy-*.md`。入口を分離。`meta/index.md` は作らない(2ファイルのみ・SSOT・過剰設計回避)。
- **commit/撤退**:両者とも commit 対象(付録A準拠)。付録Aの表に `meta/**` を追加。撤退時はメタ文書を最後に消す。

> **本リポ(dice_detection)での適用方針(2026-06-15決定)**:上記は**文書内のツリー記述としてのみ**反映し、
> 実ファイル `REQUIREMENTS.md`/`DOCS_STRUCTURE.md` の `meta/` への物理移動は**行わない**(ドッグフーディング見送り)。

---

## 7. 章編集一覧(`DOCS_STRUCTURE.md` 16箇所)

| 対象(章/行) | 変更内容 |
|---|---|
| 第4章ツリー L106-112 AGENTS.md核 | 必読セットを『GOAL+CONSTITUTION+`knowledge/philosophy-project.md`(1ファイルのみ)』に固定。3層1行ナビ追加。核から普遍流儀本体を削除し参照1行化(INV-7)。2行明記:①philosophyは参考情報・強制力はCONSTITUTIONの[機械検証]項のみ ②project.md追記時は責務境界ヘッダに従う。個人層命名規約も1行 |
| 第4章ツリー L136-139 knowledge/ | `PHILOSOPHY.md`(◇)行を削除。直下に `philosophy-project.md`(★)、`philosophy-universal.md`(◇)、`philosophy-personal.example.md`(◇)、`index.md`(◇)を追加。★は`philosophy-project.md` 1点のみ。STATE.mdは『揮発的進捗のみ・判断理由禁止』据え置き |
| 第4章 L120-121 CONSTITUTION.md | 『【普遍原則】と【固有原則】を見出しで分離』を撤廃。『各項[機械検証]タグ必須=強制契約だけ。流儀・判断理由は `knowledge/philosophy-*.md` へ(参照1行)』に変更。凍結区画の純化を明文化(INV-7) |
| 第4章 L160-162 docs/06-reference/ | `INVARIANTS.md`(★)を新設。INV-1〜8の定義+各INVに[機械検証]/[自己申告]タグ+対応門番を1対1付与。DECISIONS.md行に注記『DECISIONSはphilosophyを参照しない(一方向)』 |
| 第4章 L164-165 ルート直下 | `REQUIREMENTS.md`/`DOCS_STRUCTURE.md` を `meta/`(◆・frontmatter無し)へ。個人層実体 `knowledge/philosophy-*.local.md` 行追加。`.gitignore`を『*.local.* グロブ追記』に変更 |
| 第5章 表 L196 | knowledge/ 行の保護に追記:『全書換禁止(STATE.mdのみ全書換可)。philosophy-*.mdはappend-only+supersede印+規範語拒否+provenance back-link』 |
| 第6章 見出し L204 | 『専用ディレクトリを作らず置き場所とタグで表現』を撤回 →『設計思想は `knowledge/` バンドルに同居、層をファイル名プレフィクスで明示。層は機械強制しない(OKF consumer寛容)』 |
| 第6章 表 L206-210 | 3層の物理置き場所を `philosophy-*` 3ファイルに一意化。『固有が5箇所に散る』→『固有の散文の流儀のみproject.mdに集約、契約/達成条件/構造/点の決定は参照のみ(境界1表)』。逆流禁止(一方向)を明記 |
| 第6章 L212-221 | 『凍結と可変の分離(不変性で切る)』節へ全面改訂。read-onlyハッシュ凍結+版番号再配布(旧INV-8)を廃止、universal.mdを『diverge許容seed+append+supersede』に。普遍化経路=昇格候補節→DECISIONS ADR→人間判断の三段。ガード付き可変を明記 |
| 第6章末尾 新設 | 『OKFマッピング』節を新設(ADOPT/DROP表・frontmatter規約・consumer寛容・メタ文書はバンドル外) |
| 第7章 モードA[1] L230 | AIが読むのを『GOAL/CONSTITUTION/STATE』→『GOAL/CONSTITUTION/philosophy-project.md/STATE』へ拡張。書込先に philosophy-project.md を明示追加 |
| 第7章 モードB[4] L245 | 教訓追記先に philosophy-project.md を含める(PLAYBOOKと並列)。auto時もappend-only+supersede |
| 第7章 ハードゲート L246-250 | 1項追加:『philosophy-*.mdは追記のみ・project.mdは規範語行拒否・各追記にprovenance試行IDをback-link』を[機械検証](既存pre-commit/validateに1アサート追記)。案B原案の3チェック(universal.mdハッシュ/.local非追跡/layer整合)は全削除=新規機械チェックゼロ追加 |
| 第8章 表 L283 | context collapse行:philosophy-*.mdもappend-only+status印(古い流儀は印付き残置・activeのみ採用)。reward-hacking行に『philosophyは強制力なし。規範はCONSTITUTIONの[機械検証]項のみ』 |
| 第9章 L295付近 | ベンダー中立補足:『philosophy-*.mdのfrontmatterは`type`のみ必須(`layer`任意)。layer規約を知らない他ベンダーAIが書いても門番落ちしない=OKF consumer寛容』 |
| 第10章 P4/P6 L317/L319 | P4(SSOT)に『設計思想の正本=philosophy-project.md(固有)/philosophy-universal.md(普遍)』。P6に『凍結=機械検証契約のみ/設計思想は可変ガード。新規門番は作らず既存に最小アサート追記』 |
| 第11章 最小セット L327-337 | 手順6を『STATE.md + philosophy-project.md(★・責務境界ヘッダ+昇格候補節)』に拡張。手順7に INVARIANTS.md 追加。成立条件に『固有設計思想の可変容器が初日から存在』。.gitignore追記を『*.local.*』グロブに |
| 第11章 トリガー待ち表 L344 | PHILOSOPHY.md行→削除(★昇格済)。代わりに『philosophy-universal.md(普遍seed配布時)/index.md(philosophyが2ファイル以上)/テンプレ再配布機構+universal seed版ハッシュ記録』を◇追加 |
| 付録A L355 | commit表に `meta/**`・`philosophy-project/universal/personal.example`・`INVARIANTS.md` を追加。gitignore列に `knowledge/philosophy-*.local.md`。.gitignore追記を『*.local.*』グロブに |
| 付録C L382 | 『3層分離』反映箇所を『第6章 / philosophy-{universal,project,personal} / INVARIANTS.md(INV-5,6)』へ。『②ベンダー中立』にOKF consumer寛容を追加。新行『不変条件の検証可能性』→INVARIANTS.md。『人気リポ/OKFの良点』を新OKFマッピング節へ |
| 末尾フッタ L392-394 | 『普遍層はテンプレからコピー』→『普遍seed=philosophy-universal.mdをテンプレからコピー(以後diverge許容)。固有設計思想はphilosophy-project.mdでリポ内進化』 |

---

## 8. `REQUIREMENTS.md` 更新(8項)

1. **L5** 但し書き『作業の都合で本リポジトリ直下に置いています』→『定位置= `meta/REQUIREMENTS.md`(DOCS_STRUCTURE.md と同階層)。テンプレの器のメタ文書として物理隔離』
2. **L34-36** 3層分離チェックに各層の正本ファイルを括弧併記:普遍=`philosophy-universal.md`/固有=`philosophy-project.md`/個人=`philosophy-*.local.md`。物理ファイルで確認可能に
3. **L38**『設計哲学のコンテキストを効率よく取得』に根拠追記:起動時必読=AGENTS核+GOAL+CONSTITUTION+philosophy-project.md の固定リストで欠落なく揃う
4. **L39** 責務分離チェックに項目追加:philosophy-project.md(面の流儀)とDECISIONS.md(点の判断理由)とSTATE.md(進捗)とCONSTITUTION(強制契約)が1ファイル1責務で直交・一方向リンク
5. **L56** OKF整合チェックに追記:`type`必須・`layer`任意(機械検証しない)・consumer寛容(バリデータ置かない)を厳守=ベンダー中立を保つ
6. **L91** 未確定項『個人層をベンダー中立かつin-repoでどう表現するか』を済へ:`knowledge/philosophy-*.local.md` + .gitignore『*.local.*』グロブで決着(雛形は `philosophy-personal.example.md` でcommit)
7. **L89** 未確定項『DOCS_STRUCTURE.md を汎用版として作り直す』に本改訂(敵対的監査反映版)を紐付け
8. 付録の未確定リストに1項消し込み:『不変条件(INV-1〜8)の正本が `docs/06-reference/INVARIANTS.md` に明文化され検証可能になった』

---

## 9. 残存リスク・トレードオフ

- **[残存・低]** `universal.md` を diverge許容seed にしたことで複数リポ間の普遍層が分岐し『普遍』の一貫性が緩む。緩和:普遍化はproject.md昇格候補→DECISIONS ADR→人間がテンプレ原本へ集約の経路を正規化。テンプレ原本同期は◇なので当面は各リポ独立進化を許容(in-repo①優先)
- **[残存・中]** 規範語(MUST/禁止等)のpre-commit拒否は表層パターンマッチで、婉曲表現(『〜が望ましい』『常に〜』)は抜ける。完全な間接規範書換防止は不可能。緩和:AGENTS.md核で『philosophyは参考情報・強制力なし』を明言し権威勾配自体を断つ(機械検証+宣言の二重防御)
- **[残存・低]** supersede印(active/superseded)の運用規律をAIが守る保証は機械にはない。緩和:DECISIONSと同形の既存規約に揃え、provenance back-link必須で追記そのものは追跡可能に
- **[トレードオフ]** 機械検証を新規ゼロ追加にした結果、layerとファイル名の不整合・個人層雛形の誤運用は人間レビュー頼み(consumer寛容の代償)。緩和:層の正本をファイル名に一本化したので ls 一覧で目視確認可。.gitignoreグロブ追記は導入ステップ必須項目に格上げ
- **[実装前提]** `.gitignore` を『*.local.*』グロブへ変更すると既存個別指定が包含されるが、過去にcommit済みの `*.local.*` があればグロブ化だけでは追跡解除されない(`git rm --cached` が別途必要)。導入手順に明記
- **[baseline反転]** 第6章L204『専用ディレクトリを作らない』確定判断を覆す(ファイル名プレフィクス方式は中間・反転幅は最小)。この方針転換は `DECISIONS.md` に1本のADRとして必ず起こす
- **[範囲外送り]** テンプレ再配布機構・universal seed版ハッシュ記録・provenanceへのseed版タグ記録を◇送り。『seed改竄検知』は当面未実装(意図的なスコープ縮小=過剰設計回避⑦)。将来の多リポ配布段階で再設計が要る

---

## 付録. 競争した3案の要旨

- **案A(OKFバンドル全面・最小主義)**:`knowledge/` を唯一のOKFバンドルに統合、3層は frontmatter `layer` タグで表現(layerを2つ目の必須に格上げ)。→ ファイル名方式・「frontmatter無しでバンドル外明示」が採用された。
- **案B(専用philosophyディレクトリ+層ファイル分割)= 勝者**:`knowledge/philosophy/` に3ファイルを切り3層を物理可視化、規範と設計思想を物理分離、3ファイルを★昇格。→ 骨格採用。ただしサブディレクトリ→ファイル名プレフィクス、★を1ファイルに限定、layer機械検証撤回、と監査で修整。
- **案C(governance内で凍結/可変を二分割)**:凍結を『層』でなく『機械が違反検知できる契約か』で決め、設計思想を凍結区画から完全解放。普遍→固有の昇格は人間のADR一手。→ 「不変性で切る判定式」「昇格経路の三段」「[自己申告]残留検出ゲート」が採用された。

---

*この改訂仕様は未適用。適用時は本書の第7章(16箇所)・第8章(8項)を `DOCS_STRUCTURE.md`/`REQUIREMENTS.md` に反映し、
方針転換(専用ディレクトリ判断の撤回・凍結境界の変更)を `DECISIONS.md` にADRとして起こすこと。*

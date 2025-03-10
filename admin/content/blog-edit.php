<?php
// セッション開始
session_start();

// ログイン状態の確認
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    // 未ログインの場合はログインページへリダイレクト
    header('Location: ../index.php');
    exit;
}

// セッションのタイムアウトチェック
if (isset($_SESSION['admin_last_activity']) && (time() - $_SESSION['admin_last_activity'] > 1800)) {
    // セッションの破棄
    session_unset();
    session_destroy();
    
    // ログインページへリダイレクト
    header('Location: ../index.php?timeout=1');
    exit;
}

// 最終アクティビティ時間の更新
$_SESSION['admin_last_activity'] = time();

// 記事IDの取得
$post_id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$is_new = ($post_id === 0);
$page_title = $is_new ? '新規記事作成' : '記事編集';

// カテゴリーデータ
$categories = [
    'ニュース',
    'ブログ',
    'イベント',
    'サービス紹介',
    'お知らせ'
];

// サンプルの記事データ（実際はデータベースから取得）
$post = [];

if (!$is_new) {
    // 既存記事のデータを設定
    switch ($post_id) {
        case 1:
            $post = [
                'id' => 1,
                'title' => 'ウェルテラスアプリ、新機能追加のお知らせ',
                'slug' => 'wellteras-new-features',
                'content' => '<p>ウェルテラスアプリに新機能が追加されました。この記事では、新しく追加された機能について詳しくご紹介します。</p>
                <h2>AIによる食事分析機能</h2>
                <p>撮影した食事の写真からAIが自動で栄養素を分析し、あなたの健康状態に合わせたアドバイスを提供します。</p>
                <h2>睡眠トラッキング連携</h2>
                <p>各種スマートウォッチやスマートバンドとの連携機能が強化され、より正確な睡眠データの取得が可能になりました。</p>
                <h2>コミュニティ機能の拡充</h2>
                <p>同じ健康目標を持つユーザー同士でつながり、モチベーションを高め合える機能が追加されました。</p>',
                'excerpt' => '健康管理がより便利になる新機能を追加しました。AIによる食事分析など、最新機能をご紹介します。',
                'category' => 'ニュース',
                'tags' => 'アプリ,ウェルテラス,新機能,AI',
                'status' => '公開',
                'featured_image' => '../assets/images/blog/article1.jpg',
                'author' => 'admin',
                'date' => '2025-03-01 09:00:00',
                'meta_title' => 'ウェルテラスアプリ、新機能追加のお知らせ | Lu-Teras',
                'meta_description' => '健康コミュニティアプリ「ウェルテラス」に新しい機能が追加されました。AI食事分析、睡眠トラッキング連携など、最新機能をご紹介します。'
            ];
            break;
        case 2:
            $post = [
                'id' => 2,
                'title' => 'AI導入で業務効率化に成功した事例',
                'slug' => 'ai-business-success-case',
                'content' => '<p>本記事では、AI導入によって業務効率化に成功した企業の事例をご紹介します。</p>
                <h2>AI導入の背景</h2>
                <p>従来の手作業による処理では時間がかかり、人的ミスも発生していました。業務の効率化と精度向上を目指し、AI導入を決定しました。</p>
                <h2>導入したAIソリューション</h2>
                <p>チャットボットによる顧客対応と、データ分析による業務予測モデルを導入しました。</p>
                <h2>導入後の効果</h2>
                <p>顧客対応時間が60%削減され、業務予測の精度が85%向上しました。結果として、人的リソースを創造的な業務に振り分けることが可能になりました。</p>',
                'excerpt' => 'AI導入によって業務効率化に成功した企業の事例をご紹介します。導入のポイントと成果について解説します。',
                'category' => 'ブログ',
                'tags' => 'AI,業務効率化,事例,チャットボット',
                'status' => '公開',
                'featured_image' => '../assets/images/blog/article2.jpg',
                'author' => 'admin',
                'date' => '2025-02-15 14:30:00',
                'meta_title' => 'AI導入で業務効率化に成功した事例 | Lu-Teras',
                'meta_description' => 'AI技術を活用して業務効率化に成功した企業の事例をご紹介。導入のポイントと具体的な成果について詳しく解説します。'
            ];
            break;
        default:
            // 存在しない記事IDの場合は一覧ページにリダイレクト
            header('Location: blog.php');
            exit;
    }
} else {
    // 新規記事の初期値
    $post = [
        'id' => 0,
        'title' => '',
        'slug' => '',
        'content' => '',
        'excerpt' => '',
        'category' => '',
        'tags' => '',
        'status' => '下書き',
        'featured_image' => '',
        'author' => $_SESSION['admin_username'],
        'date' => date('Y-m-d H:i:s'),
        'meta_title' => '',
        'meta_description' => ''
    ];
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?> | Lu-Teras 管理画面</title>
    <link rel="stylesheet" href="../../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
</head>
<body class="admin-page">
    <div class="admin-layout">
        <!-- サイドバー -->
        <div class="admin-sidebar">
            <div class="admin-sidebar-header">
                <img src="../../assets/images/logo/luteras-logo-white.svg" alt="Lu-Teras" class="admin-sidebar-logo">
                <button class="sidebar-toggle">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
            
            <div class="admin-sidebar-menu">
                <div class="sidebar-menu-category">メインメニュー</div>
                <a href="../dashboard.php" class="sidebar-menu-item">
                    <span class="sidebar-menu-icon"><i class="fas fa-tachometer-alt"></i></span>
                    ダッシュボード
                </a>
                
                <div class="sidebar-menu-category">コンテンツ管理</div>
                <a href="pages.php" class="sidebar-menu-item">
                    <span class="sidebar-menu-icon"><i class="fas fa-file-alt"></i></span>
                    ページ管理
                </a>
                <a href="blog.php" class="sidebar-menu-item active">
                    <span class="sidebar-menu-icon"><i class="fas fa-blog"></i></span>
                    ブログ管理
                </a>
                <a href="media.php" class="sidebar-menu-item">
                    <span class="sidebar-menu-icon"><i class="fas fa-images"></i></span>
                    メディア管理
                </a>
                
                <div class="sidebar-menu-category">サービス情報</div>
                <a href="../services/services.php" class="sidebar-menu-item">
                    <span class="sidebar-menu-icon"><i class="fas fa-cogs"></i></span>
                    サービス管理
                </a>
                <a href="../services/cases.php" class="sidebar-menu-item">
                    <span class="sidebar-menu-icon"><i class="fas fa-briefcase"></i></span>
                    実績/事例管理
                </a>
                
                <div class="sidebar-menu-category">設定</div>
                <a href="../settings/seo.php" class="sidebar-menu-item">
                    <span class="sidebar-menu-icon"><i class="fas fa-search"></i></span>
                    SEO設定
                </a>
                <a href="../settings/social.php" class="sidebar-menu-item">
                    <span class="sidebar-menu-icon"><i class="fas fa-share-alt"></i></span>
                    SNS設定
                </a>
                <a href="../settings/users.php" class="sidebar-menu-item">
                    <span class="sidebar-menu-icon"><i class="fas fa-users"></i></span>
                    ユーザー管理
                </a>
            </div>
        </div>
        
        <!-- メインコンテンツ -->
        <div class="admin-main">
            <!-- ヘッダー -->
            <div class="admin-header">
                <div class="admin-header-title">
                    <h1><?php echo $page_title; ?></h1>
                </div>
                
                <div class="admin-user-menu">
                    <div class="admin-user-avatar">
                        <img src="../assets/images/admin-avatar.jpg" alt="Admin">
                    </div>
                    <div class="admin-user-name">
                        <?php echo htmlspecialchars($_SESSION['admin_username']); ?>
                    </div>
                    <a href="../?logout=1" class="admin-logout-btn">ログアウト</a>
                </div>
            </div>
            
            <!-- コンテンツエリア -->
            <div class="admin-content">
                <form action="" method="post" class="edit-form" enctype="multipart/form-data">
                    <input type="hidden" name="post_id" value="<?php echo $post['id']; ?>">
                    
                    <div class="edit-layout">
                        <div class="edit-main">
                            <!-- 記事タイトル -->
                            <div class="admin-card">
                                <div class="admin-card-content">
                                    <div class="admin-form-group">
                                        <label for="post-title" class="admin-form-label">タイトル</label>
                                        <input type="text" id="post-title" name="title" class="admin-form-control" value="<?php echo htmlspecialchars($post['title']); ?>" required>
                                    </div>
                                    
                                    <div class="admin-form-group">
                                        <label for="post-slug" class="admin-form-label">スラッグ</label>
                                        <div class="slug-input-group">
                                            <span class="slug-prefix">/blog/</span>
                                            <input type="text" id="post-slug" name="slug" class="admin-form-control" value="<?php echo htmlspecialchars($post['slug']); ?>">
                                            <span class="slug-suffix">.html</span>
                                        </div>
                                        <div class="form-help">英数字とハイフンのみ使用可能です。空白の場合はタイトルから自動生成されます。</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- 記事コンテンツ -->
                            <div class="admin-card">
                                <div class="admin-card-header">
                                    <h2 class="admin-card-title">記事コンテンツ</h2>
                                    <div class="editor-toolbar">
                                        <button type="button" class="btn btn-sm btn-outline">
                                            <i class="fas fa-bold"></i>
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline">
                                            <i class="fas fa-italic"></i>
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline">
                                            <i class="fas fa-link"></i>
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline">
                                            <i class="fas fa-image"></i>
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline">
                                            <i class="fas fa-list-ul"></i>
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline">
                                            <i class="fas fa-list-ol"></i>
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline">
                                            <i class="fas fa-code"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="admin-card-content">
                                    <div class="admin-form-group">
                                        <textarea id="post-content" name="content" class="admin-form-control admin-form-textarea rich-text-editor" rows="15"><?php echo htmlspecialchars($post['content']); ?></textarea>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- 抜粋 -->
                            <div class="admin-card">
                                <div class="admin-card-header">
                                    <h2 class="admin-card-title">抜粋</h2>
                                </div>
                                <div class="admin-card-content">
                                    <div class="admin-form-group">
                                        <textarea id="post-excerpt" name="excerpt" class="admin-form-control admin-form-textarea" rows="3"><?php echo htmlspecialchars($post['excerpt']); ?></textarea>
                                        <div class="form-help">記事の概要を入力してください。一覧ページやSNSシェア時に表示されます。</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- SEO設定 -->
                            <div class="admin-card">
                                <div class="admin-card-header">
                                    <h2 class="admin-card-title">SEO設定</h2>
                                    <button type="button" class="btn btn-sm btn-outline accordion-toggle">
                                        <i class="fas fa-chevron-down"></i>
                                    </button>
                                </div>
                                <div class="admin-card-content">
                                    <div class="admin-form-group">
                                        <label for="meta-title" class="admin-form-label">メタタイトル</label>
                                        <input type="text" id="meta-title" name="meta_title" class="admin-form-control" value="<?php echo htmlspecialchars($post['meta_title']); ?>">
                                        <div class="form-help">検索結果に表示されるタイトルです。空白の場合は記事タイトルが使用されます。</div>
                                    </div>
                                    <div class="admin-form-group">
                                        <label for="meta-description" class="admin-form-label">メタディスクリプション</label>
                                        <textarea id="meta-description" name="meta_description" class="admin-form-control" rows="2"><?php echo htmlspecialchars($post['meta_description']); ?></textarea>
                                        <div class="form-help">検索結果に表示される説明文です。空白の場合は抜粋が使用されます。</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="edit-sidebar">
                            <!-- 公開設定 -->
                            <div class="admin-card">
                                <div class="admin-card-header">
                                    <h2 class="admin-card-title">公開設定</h2>
                                </div>
                                <div class="admin-card-content">
                                    <div class="admin-form-group">
                                        <label for="post-status" class="admin-form-label">状態</label>
                                        <select id="post-status" name="status" class="admin-form-select">
                                            <option value="公開" <?php echo $post['status'] === '公開' ? 'selected' : ''; ?>>公開</option>
                                            <option
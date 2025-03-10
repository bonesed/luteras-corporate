<?php
// セッション開始
session_start();

// ログイン状態の確認
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    // 未ログインの場合はログインページへリダイレクト
    header('Location: ../index.php');
    exit;
}

// セッションのタイムアウトチェック（30分）
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

// サンプルブログ記事データ（実際はデータベースから取得）
$blog_posts = [
    [
        'id' => 1,
        'title' => 'ウェルテラスアプリ、新機能追加のお知らせ',
        'slug' => 'wellteras-new-features',
        'category' => 'ニュース',
        'status' => '公開',
        'author' => 'admin',
        'date' => '2025-03-01 09:00:00',
        'views' => 254
    ],
    [
        'id' => 2,
        'title' => 'AI導入で業務効率化に成功した事例',
        'slug' => 'ai-business-success-case',
        'category' => 'ブログ',
        'status' => '公開',
        'author' => 'admin',
        'date' => '2025-02-15 14:30:00',
        'views' => 189
    ],
    [
        'id' => 3,
        'title' => '健康×AIセミナーを開催しました',
        'slug' => 'health-ai-seminar-2025',
        'category' => 'イベント',
        'status' => '公開',
        'author' => 'admin',
        'date' => '2025-02-01 16:45:00',
        'views' => 142
    ],
    [
        'id' => 4,
        'title' => '（下書き）次回健康セミナーの告知',
        'slug' => 'next-health-seminar-announcement',
        'category' => 'イベント',
        'status' => '下書き',
        'author' => 'admin',
        'date' => '2025-03-05 11:20:00',
        'views' => 0
    ]
];

// カテゴリーデータ
$categories = [
    'ニュース',
    'ブログ',
    'イベント',
    'サービス紹介',
    'お知らせ'
];
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ブログ管理 | Lu-Teras 管理画面</title>
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
                    <h1>ブログ管理</h1>
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
                <!-- ブログ記事一覧 -->
                <div class="admin-card">
                    <div class="admin-card-header">
                        <h2 class="admin-card-title">ブログ記事一覧</h2>
                        <a href="blog-edit.php" class="btn btn-primary btn-sm">
                            <i class="fas fa-plus"></i> 新規追加
                        </a>
                    </div>
                    <div class="admin-card-content">
                        <!-- フィルター -->
                        <div class="filter-toolbar">
                            <div class="filter-group">
                                <select class="admin-form-select">
                                    <option value="">すべてのカテゴリー</option>
                                    <?php foreach ($categories as $category): ?>
                                        <option value="<?php echo htmlspecialchars($category); ?>"><?php echo htmlspecialchars($category); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="filter-group">
                                <select class="admin-form-select">
                                    <option value="">すべての状態</option>
                                    <option value="公開">公開</option>
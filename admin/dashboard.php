<?php
// セッション開始
session_start();

// ログイン状態の確認
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    // 未ログインの場合はログインページへリダイレクト
    header('Location: index.php');
    exit;
}

// セッションのタイムアウトチェック（30分）
if (isset($_SESSION['admin_last_activity']) && (time() - $_SESSION['admin_last_activity'] > 1800)) {
    // セッションの破棄
    session_unset();
    session_destroy();
    
    // ログインページへリダイレクト
    header('Location: index.php?timeout=1');
    exit;
}

// 最終アクティビティ時間の更新
$_SESSION['admin_last_activity'] = time();

// ログアウト処理
if (isset($_GET['logout']) && $_GET['logout'] === '1') {
    // セッションの破棄
    session_unset();
    session_destroy();
    
    // ログインページへリダイレクト
    header('Location: index.php?logout=1');
    exit;
}

// ダッシュボードデータ（実際はデータベースから取得）
$stats = [
    'total_visitors' => 1245,
    'new_contacts' => 8,
    'total_articles' => 16,
    'latest_update' => '2025-03-09 10:30:45'
];

$recent_contacts = [
    [
        'id' => 1,
        'name' => '山田太郎',
        'email' => 'yamada@example.com',
        'subject' => 'サービスについての問い合わせ',
        'date' => '2025-03-09 09:15:30',
        'status' => '未対応'
    ],
    [
        'id' => 2,
        'name' => '鈴木花子',
        'email' => 'suzuki@example.com',
        'subject' => 'AI導入支援について',
        'date' => '2025-03-08 15:42:18',
        'status' => '対応中'
    ],
    [
        'id' => 3,
        'name' => '佐藤健',
        'email' => 'sato@example.com',
        'subject' => 'ウェルテラスアプリの機能について',
        'date' => '2025-03-07 11:23:05',
        'status' => '完了'
    ]
];

$recent_activities = [
    [
        'user' => 'admin',
        'action' => 'ブログ記事「AI導入で業務効率化に成功した事例」を更新しました',
        'date' => '2025-03-09 10:30:45'
    ],
    [
        'user' => 'admin',
        'action' => 'お問い合わせ「AI導入支援について」の対応状況を更新しました',
        'date' => '2025-03-08 16:15:22'
    ],
    [
        'user' => 'admin',
        'action' => '新しいブログ記事「健康×AIセミナーを開催しました」を追加しました',
        'date' => '2025-03-07 14:50:33'
    ]
];
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ダッシュボード | Lu-Teras 管理画面</title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="assets/css/admin.css">
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
                <img src="../assets/images/logo/luteras-logo-white.svg" alt="Lu-Teras" class="admin-sidebar-logo">
                <button class="sidebar-toggle">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
            
            <div class="admin-sidebar-menu">
                <div class="sidebar-menu-category">メインメニュー</div>
                <a href="dashboard.php" class="sidebar-menu-item active">
                    <span class="sidebar-menu-icon"><i class="fas fa-tachometer-alt"></i></span>
                    ダッシュボード
                </a>
                
                <div class="sidebar-menu-category">コンテンツ管理</div>
                <a href="content/pages.php" class="sidebar-menu-item">
                    <span class="sidebar-menu-icon"><i class="fas fa-file-alt"></i></span>
                    ページ管理
                </a>
                <a href="content/blog.php" class="sidebar-menu-item">
                    <span class="sidebar-menu-icon"><i class="fas fa-blog"></i></span>
                    ブログ管理
                </a>
                <a href="content/media.php" class="sidebar-menu-item">
                    <span class="sidebar-menu-icon"><i class="fas fa-images"></i></span>
                    メディア管理
                </a>
                
                <div class="sidebar-menu-category">サービス情報</div>
                <a href="services/services.php" class="sidebar-menu-item">
                    <span class="sidebar-menu-icon"><i class="fas fa-cogs"></i></span>
                    サービス管理
                </a>
                <a href="services/cases.php" class="sidebar-menu-item">
                    <span class="sidebar-menu-icon"><i class="fas fa-briefcase"></i></span>
                    実績/事例管理
                </a>
                
                <div class="sidebar-menu-category">設定</div>
                <a href="settings/seo.php" class="sidebar-menu-item">
                    <span class="sidebar-menu-icon"><i class="fas fa-search"></i></span>
                    SEO設定
                </a>
                <a href="settings/social.php" class="sidebar-menu-item">
                    <span class="sidebar-menu-icon"><i class="fas fa-share-alt"></i></span>
                    SNS設定
                </a>
                <a href="settings/users.php" class="sidebar-menu-item">
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
                    <h1>ダッシュボード</h1>
                </div>
                
                <div class="admin-user-menu">
                    <div class="admin-user-avatar">
                        <img src="assets/images/admin-avatar.jpg" alt="Admin">
                    </div>
                    <div class="admin-user-name">
                        <?php echo htmlspecialchars($_SESSION['admin_username']); ?>
                    </div>
                    <a href="?logout=1" class="admin-logout-btn">ログアウト</a>
                </div>
            </div>
            
            <!-- コンテンツエリア -->
            <div class="admin-content">
                <!-- 統計ウィジェット -->
                <div class="widget-grid">
                    <div class="widget widget-primary">
                        <div class="widget-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="widget-content">
                            <h3 class="widget-title">総訪問者数</h3>
                            <p class="widget-value"><?php echo number_format($stats['total_visitors']); ?></p>
                        </div>
                    </div>
                    
                    <div class="widget widget-secondary">
                        <div class="widget-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="widget-content">
                            <h3 class="widget-title">新規お問い合わせ</h3>
                            <p class="widget-value"><?php echo $stats['new_contacts']; ?></p>
                        </div>
                    </div>
                    
                    <div class="widget widget-success">
                        <div class="widget-icon">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="widget-content">
                            <h3 class="widget-title">記事数</h3>
                            <p class="widget-value"><?php echo $stats['total_articles']; ?></p>
                        </div>
                    </div>
                    
                    <div class="widget widget-warning">
                        <div class="widget-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="widget-content">
                            <h3 class="widget-title">最終更新</h3>
                            <p class="widget-value"><?php echo date('m/d H:i', strtotime($stats['latest_update'])); ?></p>
                        </div>
                    </div>
                </div>
                
                <!-- 最近のお問い合わせ -->
                <div class="admin-card">
                    <div class="admin-card-header">
                        <h2 class="admin-card-title">
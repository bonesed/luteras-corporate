<?php
// セッション開始
session_start();

// ログイン状態の確認
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    // ログイン済みの場合はダッシュボードへリダイレクト
    header('Location: dashboard.php');
    exit;
}

// ログイン処理
$error_message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 環境変数または設定ファイルから読み込むべきだが、サンプルとして直接記述
    $admin_username = 'admin';
    $admin_password = 'password123'; // 実際の環境では安全なパスワードハッシュを使用する
    
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if ($username === $admin_username && $password === $admin_password) {
        // ログイン成功
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $username;
        $_SESSION['admin_last_activity'] = time();
        
        // ダッシュボードへリダイレクト
        header('Location: dashboard.php');
        exit;
    } else {
        // ログイン失敗
        $error_message = 'ユーザー名またはパスワードが間違っています。';
    }
}
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>管理者ログイン | Lu-Teras</title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="assets/css/admin.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
</head>
<body class="admin-login-page">
    <div class="admin-container">
        <div class="login-box">
            <div class="login-header">
                <img src="../assets/images/logo/luteras-logo.svg" alt="Lu-Teras" class="admin-logo">
                <h1>管理者ログイン</h1>
            </div>
            
            <?php if ($error_message): ?>
                <div class="alert alert-danger">
                    <?php echo htmlspecialchars($error_message); ?>
                </div>
            <?php endif; ?>
            
            <form method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" class="login-form">
                <div class="form-group">
                    <label for="username">ユーザー名</label>
                    <input type="text" id="username" name="username" required autocomplete="username">
                </div>
                
                <div class="form-group">
                    <label for="password">パスワード</label>
                    <input type="password" id="password" name="password" required autocomplete="current-password">
                </div>
                
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">ログイン</button>
                </div>
                
                <div class="form-footer">
                    <a href="../index.html">サイトに戻る</a>
                </div>
            </form>
        </div>
    </div>

    <div class="admin-background">
        <div class="admin-particles"></div>
    </div>

    <script src="assets/js/admin.js"></script>
</body>
</html>
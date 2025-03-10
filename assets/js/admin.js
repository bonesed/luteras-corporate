/*
* Lu-Teras コーポレートサイト
* 管理画面用JavaScriptファイル
*/

document.addEventListener('DOMContentLoaded', function() {
    initAdminSidebar();
    initLoginAnimation();
    initFormValidation();
    initNotifications();
    initModalHandlers();
    initDataTables();
    initRichTextEditor();
    initDatePickers();
    initImageUploader();
});

// 管理画面サイドバー制御
function initAdminSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const adminSidebar = document.querySelector('.admin-sidebar');
    const adminMain = document.querySelector('.admin-main');
    const adminOverlay = document.querySelector('.admin-overlay');
    
    // トグルボタンクリックイベント
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            document.body.classList.toggle('sidebar-open');
            adminSidebar.classList.toggle('active');
        });
    }
    
    // オーバーレイクリックイベント
    if (adminOverlay) {
        adminOverlay.addEventListener('click', function() {
            document.body.classList.remove('sidebar-open');
            adminSidebar.classList.remove('active');
        });
    }
    
    // ウィンドウリサイズ対応
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            document.body.classList.remove('sidebar-open');
            adminSidebar.classList.remove('active');
        }
    });
    
    // モバイルデバイスの場合の処理
    if (window.innerWidth <= 991) {
        adminSidebar.classList.remove('active');
        adminMain.style.marginLeft = '0';
    }
}

// ログイン画面アニメーション
function initLoginAnimation() {
    const loginPage = document.querySelector('.admin-login-page');
    
    if (loginPage) {
        // パーティクル背景アニメーション
        const adminParticles = document.querySelector('.admin-particles');
        
        if (adminParticles) {
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // ランダムなスタイル
                const size = Math.random() * 5 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
                particle.style.animationDelay = `${Math.random() * 2}s`;
                particle.style.opacity = Math.random() * 0.5 + 0.1;
                
                adminParticles.appendChild(particle);
            }
        }
        
        // フォーム表示アニメーション
        const loginBox = document.querySelector('.login-box');
        if (loginBox) {
            loginBox.style.opacity = '0';
            loginBox.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                loginBox.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                loginBox.style.opacity = '1';
                loginBox.style.transform = 'translateY(0)';
            }, 300);
        }
    }
}

// フォームバリデーション
function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        }, false);
    });
    
    // パスワード強度チェック
    const passwordFields = document.querySelectorAll('.password-strength');
    
    passwordFields.forEach(field => {
        field.addEventListener('input', function() {
            const password = this.value;
            const strengthMeter = this.nextElementSibling;
            
            if (!strengthMeter || !strengthMeter.classList.contains('password-strength-meter')) return;
            
            let strength = 0;
            
            // 長さチェック
            if (password.length >= 8) strength += 1;
            
            // 大文字小文字チェック
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
            
            // 数字チェック
            if (password.match(/\d/)) strength += 1;
            
            // 特殊文字チェック
            if (password.match(/[^a-zA-Z\d]/)) strength += 1;
            
            // 強度表示
            strengthMeter.className = 'password-strength-meter';
            
            if (strength === 0) {
                strengthMeter.classList.add('very-weak');
                strengthMeter.textContent = 'とても弱い';
            } else if (strength === 1) {
                strengthMeter.classList.add('weak');
                strengthMeter.textContent = '弱い';
            } else if (strength === 2) {
                strengthMeter.classList.add('medium');
                strengthMeter.textContent = '普通';
            } else if (strength === 3) {
                strengthMeter.classList.add('strong');
                strengthMeter.textContent = '強い';
            } else {
                strengthMeter.classList.add('very-strong');
                strengthMeter.textContent = 'とても強い';
            }
        });
    });
}

// 通知システム
function initNotifications() {
    // 通知表示関数
    window.showNotification = function(message, type = 'success', duration = 3000) {
        // 通知コンテナ
        let notificationContainer = document.querySelector('.notification-container');
        
        if (!notificationContainer) {
            notificationContainer = document.createElement('div');
            notificationContainer.className = 'notification-container';
            document.body.appendChild(notificationContainer);
        }
        
        // 通知要素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas ${getIconForNotificationType(type)}"></i>
            </div>
            <div class="notification-content">
                ${message}
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // 追加
        notificationContainer.appendChild(notification);
        
        // 表示アニメーション
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // 閉じるボタン
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            closeNotification(notification);
        });
        
        // 自動消去
        if (duration > 0) {
            setTimeout(() => {
                closeNotification(notification);
            }, duration);
        }
    };
    
    // 通知を閉じる関数
    function closeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
    
    // 通知タイプごとのアイコン
    function getIconForNotificationType(type) {
        switch (type) {
            case 'success':
                return 'fa-check-circle';
            case 'error':
                return 'fa-exclamation-circle';
            case 'warning':
                return 'fa-exclamation-triangle';
            case 'info':
                return 'fa-info-circle';
            default:
                return 'fa-bell';
        }
    }
    
    // URLパラメータから通知表示
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('success')) {
        window.showNotification(decodeURIComponent(urlParams.get('success')), 'success');
    }
    
    if (urlParams.has('error')) {
        window.showNotification(decodeURIComponent(urlParams.get('error')), 'error');
    }
    
    if (urlParams.has('warning')) {
        window.showNotification(decodeURIComponent(urlParams.get('warning')), 'warning');
    }
    
    if (urlParams.has('info')) {
        window.showNotification(decodeURIComponent(urlParams.get('info')), 'info');
    }
    
    // ログアウト通知
    if (urlParams.has('logout') && urlParams.get('logout') === '1') {
        window.showNotification('ログアウトしました。', 'info');
    }
    
    // タイムアウト通知
    if (urlParams.has('timeout') && urlParams.get('timeout') === '1') {
        window.showNotification('セッションがタイムアウトしました。再度ログインしてください。', 'warning');
    }
}

// モーダルダイアログ
function initModalHandlers() {
    // モーダル開閉関数
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
        
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    };
    
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        modal.classList.remove('show');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }, 300);
    };
    
    // モーダルオープナーの設定
    const modalOpeners = document.querySelectorAll('[data-modal]');
    
    modalOpeners.forEach(opener => {
        const modalId = opener.getAttribute('data-modal');
        
        opener.addEventListener('click', function(e) {
            e.preventDefault();
            window.openModal(modalId);
        });
    });
    
    // モーダルクローザーの設定
    const modalClosers = document.querySelectorAll('[data-close-modal]');
    
    modalClosers.forEach(closer => {
        const modalId = closer.getAttribute('data-close-modal');
        
        closer.addEventListener('click', function(e) {
            e.preventDefault();
            window.closeModal(modalId);
        });
    });
    
    // モーダル背景クリックで閉じる
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
                
                setTimeout(() => {
                    this.style.display = 'none';
                    document.body.classList.remove('modal-open');
                }, 300);
            }
        });
    });
}

// データテーブル初期化
function initDataTables() {
    // データテーブルの基本設定
    // 実際のアプリケーションではライブラリを使用
    const tables = document.querySelectorAll('.admin-table');
    
    tables.forEach(table => {
        // テーブルソート機能
        const headers = table.querySelectorAll('th[data-sort]');
        
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const column = this.getAttribute('data-sort');
                const direction = this.classList.contains('asc') ? 'desc' : 'asc';
                
                // ソート方向の切り替え
                headers.forEach(h => h.classList.remove('asc', 'desc'));
                this.classList.add(direction);
                
                // ここで実際のソート処理を実装
                // 開発用のダミーコード
                console.log(`Sorting column ${column} in ${direction} order`);
            });
        });
    });
}

// リッチテキストエディタ初期化
function initRichTextEditor() {
    // リッチテキストエディタの基本設定
    // 実際のアプリケーションではライブラリを使用
    const editors = document.querySelectorAll('.rich-text-editor');
    
    editors.forEach(editor => {
        // 開発用のダミーコード
        if (editor) {
            console.log('Rich text editor initialized');
        }
    });
}

// 日付ピッカー初期化
function initDatePickers() {
    // 日付ピッカーの基本設定
    // 実際のアプリケーションではライブラリを使用
    const datePickers = document.querySelectorAll('.date-picker');
    
    datePickers.forEach(picker => {
        // 開発用のダミーコード
        if (picker) {
            console.log('Date picker initialized');
        }
    });
}

// 画像アップローダー初期化
function initImageUploader() {
    const imageUploaders = document.querySelectorAll('.image-uploader');
    
    imageUploaders.forEach(uploader => {
        const input = uploader.querySelector('input[type="file"]');
        const preview = uploader.querySelector('.image-preview');
        
        if (input && preview) {
            input.addEventListener('change', function() {
                const file = this.files[0];
                
                if (file) {
                    const reader = new FileReader();
                    
                    reader.addEventListener('load', function() {
                        preview.innerHTML = `<img src="${this.result}" alt="プレビュー">`;
                        uploader.classList.add('has-image');
                    });
                    
                    reader.readAsDataURL(file);
                }
            });
        }
    });
    
    // ドラッグ&ドロップサポート
    const dropAreas = document.querySelectorAll('.drop-area');
    
    dropAreas.forEach(area => {
        const input = area.querySelector('input[type="file"]');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            area.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            area.addEventListener(eventName, function() {
                area.classList.add('highlight');
            });
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            area.addEventListener(eventName, function() {
                area.classList.remove('highlight');
            });
        });
        
        area.addEventListener('drop', function(e) {
            if (input) {
                input.files = e.dataTransfer.files;
                
                // ファイル変更イベントを発火
                const event = new Event('change', { bubbles: true });
                input.dispatchEvent(event);
            }
        });
    });
}
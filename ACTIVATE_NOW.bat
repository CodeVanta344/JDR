@echo off
echo ========================================
echo   ACTIVATION REALTIME AUTOMATIQUE
echo ========================================
echo.
echo Etape 1: Copie du SQL dans le presse-papiers...

powershell -Command "Get-Content 'ACTIVATE_COMBAT_LOCKS_ONLY.sql' -Raw | Set-Clipboard"

echo OK - SQL copie !
echo.
echo Etape 2: Ouverture du SQL Editor dans votre navigateur...

start https://supabase.com/dashboard/project/okanuafsmkuzyuyqibpu/sql/new

echo OK - Navigateur ouvert !
echo.
echo ========================================
echo   IL NE VOUS RESTE PLUS QU'A :
echo ========================================
echo   1. Dans l'onglet qui vient de s'ouvrir
echo   2. Coller (Ctrl+V)
echo   3. Cliquer sur le bouton vert "RUN"
echo.
echo C'est tout ! 3 secondes !
echo ========================================
echo.
pause

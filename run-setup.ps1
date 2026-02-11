$url = "https://okanuafsmkuzyuyqibpu.supabase.co/functions/v1/setup-database"
$token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rYW51YWZzbWt1enl1eXFpYnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1MDE5NzMsImV4cCI6MjA1MTA3Nzk3M30.EzChL7g43s1KW8v8yx7L2eKk_sJiHvFMkBdWUVKElp0"

Write-Host "🚀 Tentative de création automatique de la table world_state..." -ForegroundColor Cyan
Write-Host ""

try {
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }
    
    $response = Invoke-RestMethod -Uri $url -Method POST -Headers $headers -ErrorAction Stop
    
    if ($response.success) {
        Write-Host "✅ SUCCÈS!" -ForegroundColor Green
        Write-Host ""
        Write-Host $response.message -ForegroundColor Green
        Write-Host ""
        
        if ($response.reminder) {
            Write-Host "⚠️  IMPORTANT:" -ForegroundColor Yellow
            Write-Host $response.reminder -ForegroundColor Yellow
            Write-Host ""
        }
        
        Write-Host "🎉 La synchronisation des marchands est maintenant active!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  La fonction a retourné une erreur:" -ForegroundColor Yellow
        Write-Host $response.message -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📋 Instructions manuelles:" -ForegroundColor Cyan
        foreach ($instruction in $response.instructions) {
            Write-Host "   $instruction"
        }
    }
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    $errorBody = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
    
    Write-Host "❌ Erreur lors de l'appel à la fonction:" -ForegroundColor Red
    Write-Host "   Status: $statusCode" -ForegroundColor Red
    
    if ($errorBody) {
        Write-Host "   Message: $($errorBody.message)" -ForegroundColor Red
        Write-Host ""
        
        if ($errorBody.instructions) {
            Write-Host "📋 Instructions manuelles:" -ForegroundColor Cyan
            foreach ($instruction in $errorBody.instructions) {
                Write-Host "   $instruction"
            }
        }
    } else {
        Write-Host "   Erreur: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "💡 Solution alternative:" -ForegroundColor Cyan
    Write-Host "   Ouvrez le fichier: setup-database.html" -ForegroundColor White
    Write-Host "   Il contient un guide visuel pas-à-pas." -ForegroundColor White
}

Write-Host ""
Write-Host "Appuyez sur Entrée pour fermer..." -ForegroundColor Gray
Read-Host

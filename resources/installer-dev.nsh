!include nsDialogs.nsh
!include LogicLib.nsh

!include LogicLib.nsh
!include x64.nsh

Var Dialog
Var /GLOBAL store_code_t
Var /GLOBAL pos_name_t
Var /GLOBAL store_code
Var /GLOBAL pos_name

Section ;Check if VCRedist is installed
ClearErrors
${If} ${RunningX64} ;X64  
  ReadRegStr $0 HKLM "SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\x64" "Installed"
  ${If} $0 == 1
    DetailPrint "VC 2017 Redistributable already installed"
  ${Else}
    NSISdl::download "https://truss-mysql-installer.s3.eu-central-1.amazonaws.com/VC_redist.x64.exe" "$APPDATA\VC_redist.x64.exe"
    ExecWait '"$APPDATA\VC_redist.x64.exe" /quiet'
  ${EndIf}
${Else}
 ReadRegStr $0 HKLM "SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\x86" "Installed"
  ${If} $0 == 1
    DetailPrint "VC 2017 Redistributable already installed"
  ${Else}
    NSISdl::download "https://truss-mysql-installer.s3.eu-central-1.amazonaws.com/VC_redist.x86.exe" "$APPDATA\VC_redist.x86.exe"
    ExecWait '"$APPDATA\VC_redist.x86.exe" /quiet'
  ${EndIf}
${EndIf}  
SectionEnd

Section
  ClearErrors 
ReadRegStr $0 HKLM SYSTEM\CurrentControlSet\Services\MYSQL80 "ImagePath"
  ${If} ${Errors} ; If MYSQL80 service does not exist
    InitPluginsDir
    ${If} ${RunningX64} ;X64
        DetailPrint "64-bit Windows"
        CreateDirectory $PROGRAMFILES64\MySQL
        NSISdl::download "https://truss-mysql-installer.s3.eu-central-1.amazonaws.com/mysql-8.0.22-winx64.zip" "$APPDATA\mysql-8.0.22-winx64.zip"
        ;nsisunz::UnzipToStack  "$APPDATA\mysql-8.0.22-winx64.zip" "$PROGRAMFILES64\MySQL"
        ExecWait "powershell -ExecutionPolicy Bypass -WindowStyle Hidden  Expand-Archive '$APPDATA\mysql-8.0.22-winx64.zip' '$PROGRAMFILES64\MySQL' -Force" $0
        nsExec::ExecToStack '$PROGRAMFILES64\MySQL\mysql-8.0.22-winx64\bin\mysqld --initialize-insecure' 
        nsExec::ExecToStack '$PROGRAMFILES64\MySQL\mysql-8.0.22-winx64\bin\mysqld --install MySQL80'
        nsExec::ExecToStack 'sc start MySQL80'
        ;Pop $0 ; Exit code / error
        ;MessageBox MB_OK $0
        ;Pop $1 ; stdout output
        ;MessageBox MB_OK $1
    ${Else} ;X32
        DetailPrint "32-bit Windows"
        CreateDirectory $PROGRAMFILES\MySQL
        NSISdl::download "https://truss-mysql-installer.s3.eu-central-1.amazonaws.com/mysql-5.7.31-winx32.zip" "$APPDATA\mysql-5.7.31-win32.zip"
        ExecWait "powershell -ExecutionPolicy Bypass -WindowStyle Hidden  Expand-Archive '$APPDATA\mysql-5.7.31-win32.zip' '$PROGRAMFILES\MySQL' -Force" $0
        nsExec::ExecToStack '$PROGRAMFILES\MySQL\mysql-5.7.31-win32\bin\mysqld --initialize-insecure' 
        nsExec::ExecToStack '$PROGRAMFILES\MySQL\mysql-5.7.31-win32\bin\mysqld --install MySQL80'
        nsExec::ExecToStack 'sc start MySQL80'
        ;Pop $0 ; Exit code / error
        ;MessageBox MB_OK $0
        ;Pop $1 ; stdout output
        ;MessageBox MB_OK $1
    ${EndIf}  
  ${Else}  
  ${EndIf}
SectionEnd

Section
  ClearErrors
  ${If} ${RunningX64}
      DetailPrint "64-bit Windows"
      CreateDirectory "$PROGRAMFILES64\Truss Project Manager REST API"
      NSISdl::download "https://truss-project-manager-api-publish.s3.eu-central-1.amazonaws.com/fine-netcore-api-tpm-env-local-x64/publish/ApmBackend/appsettings.json" "$PROGRAMFILES64\Truss Project Manager REST API\appsettings.json"
      NSISdl::download "https://truss-project-manager-api-publish.s3.eu-central-1.amazonaws.com/fine-netcore-api-tpm-env-local-x64/publish/ApmBackend/nlog.config" "$PROGRAMFILES64\Truss Project Manager REST API\nlog.config"
      NSISdl::download "https://truss-project-manager-api-publish.s3.eu-central-1.amazonaws.com/fine-netcore-api-tpm-env-local-x64/publish/ApmBackend/web.config" "$PROGRAMFILES64\Truss Project Manager REST API\web.config"
      NSISdl::download "https://truss-project-manager-api-publish.s3.eu-central-1.amazonaws.com/fine-netcore-api-tpm-env-local-x64/publish/ApmBackend/ApmBackend.exe" "$PROGRAMFILES64\Truss Project Manager REST API\ApmBackend.exe"
  ${Else}
      DetailPrint "32-bit Windows"
      CreateDirectory "$PROGRAMFILES\Truss Project Manager REST API"
      NSISdl::download "https://truss-project-manager-api-publish.s3.eu-central-1.amazonaws.com/fine-netcore-api-tpm-env-local-x32/publish/ApmBackend/appsettings.json" "$PROGRAMFILES\Truss Project Manager REST API\appsettings.json"
      NSISdl::download "https://truss-project-manager-api-publish.s3.eu-central-1.amazonaws.com/fine-netcore-api-tpm-env-local-x32/publish/ApmBackend/nlog.config" "$PROGRAMFILES\Truss Project Manager REST API\nlog.config"
      NSISdl::download "https://truss-project-manager-api-publish.s3.eu-central-1.amazonaws.com/fine-netcore-api-tpm-env-local-x32/publish/ApmBackend/web.config" "$PROGRAMFILES\Truss Project Manager REST API\web.config"
      NSISdl::download "https://truss-project-manager-api-publish.s3.eu-central-1.amazonaws.com/fine-netcore-api-tpm-env-local-x32/publish/ApmBackend/ApmBackend.exe" "$PROGRAMFILES\Truss Project Manager REST API\ApmBackend.exe"
  ${EndIf}   
SectionEnd


!macro customInstall
  WriteINIStr $INSTDIR\web.ini base store_code $store_code
  WriteINIStr $INSTDIR\web.ini base pos_name $pos_name
!macroend
!macro customHeader

  !system "echo '' > ${BUILD_RESOURCES_DIR}/customHeader"
!macroend

!macro preInit
  !system "echo '' > ${BUILD_RESOURCES_DIR}/preInit"
!macroend

!macro customInit
  !system "echo '' > ${BUILD_RESOURCES_DIR}/customInit"
!macroend

!macro customInstallMode
!macroend
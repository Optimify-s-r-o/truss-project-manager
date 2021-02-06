!include nsDialogs.nsh
!include LogicLib.nsh
!include LogicLib.nsh
!include x64.nsh

Var Dialog
Var /GLOBAL store_code_t
Var /GLOBAL pos_name_t
Var /GLOBAL store_code
Var /GLOBAL pos_name
Var /GLOBAL version
Var /GLOBAL localBackendPath

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
    ${Else} ;X32
        DetailPrint "32-bit Windows"
        CreateDirectory $PROGRAMFILES\MySQL
        NSISdl::download "https://truss-mysql-installer.s3.eu-central-1.amazonaws.com/mysql-5.7.31-winx32.zip" "$APPDATA\mysql-5.7.31-win32.zip"
        ExecWait "powershell -ExecutionPolicy Bypass -WindowStyle Hidden  Expand-Archive '$APPDATA\mysql-5.7.31-win32.zip' '$PROGRAMFILES\MySQL' -Force" $0
        nsExec::ExecToStack '$PROGRAMFILES\MySQL\mysql-5.7.31-win32\bin\mysqld --initialize-insecure' 
        nsExec::ExecToStack '$PROGRAMFILES\MySQL\mysql-5.7.31-win32\bin\mysqld --install MySQL80'
        nsExec::ExecToStack 'sc start MySQL80'
    ${EndIf}  
  ${Else}  
  ${EndIf}
SectionEnd

Section
  ClearErrors
  MessageBox MB_OK ${VERSION}
  StrCpy $version ${VERSION}
  StrCpy $localBackendPathX32 "https://truss-project-manager-api-publish.s3.eu-central-1.amazonaws.com/$version-x32/publish/ApmBackend"
  StrCpy $localBackendPathX64 "https://truss-project-manager-api-publish.s3.eu-central-1.amazonaws.com/$version-x64/publish/ApmBackend"
  ${If} ${RunningX64}
      DetailPrint "64-bit Windows"
      CreateDirectory "$PROGRAMFILES64\Truss Project Manager REST API"
      NSISdl::download "$localBackendPathX64/appsettings.json" "$PROGRAMFILES64\Truss Project Manager REST API\appsettings.json"
      NSISdl::download "$localBackendPathX64/nlog.config" "$PROGRAMFILES64\Truss Project Manager REST API\nlog.config"
      NSISdl::download "$localBackendPathX64/web.config" "$PROGRAMFILES64\Truss Project Manager REST API\web.config"
      NSISdl::download "$localBackendPathX64/ApmBackend.exe" "$PROGRAMFILES64\Truss Project Manager REST API\ApmBackend.exe"
  ${Else}
      DetailPrint "32-bit Windows"
      CreateDirectory "$PROGRAMFILES\Truss Project Manager REST API"
      NSISdl::download "$localBackendPathX32/appsettings.json" "$PROGRAMFILES\Truss Project Manager REST API\appsettings.json"
      NSISdl::download "$localBackendPathX32/nlog.config" "$PROGRAMFILES\Truss Project Manager REST API\nlog.config"
      NSISdl::download "$localBackendPathX32/web.config" "$PROGRAMFILES\Truss Project Manager REST API\web.config"
      NSISdl::download "$localBackendPathX32/ApmBackend.exe" "$PROGRAMFILES\Truss Project Manager REST API\ApmBackend.exe"
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
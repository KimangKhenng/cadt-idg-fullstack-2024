# Setting Up a Local Cloud and CI for DevOps

## Prerequisites
Before installing `act` and `localstack`, ensure you have Docker installed and running on your machine:
- [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Docker for macOS](https://docs.docker.com/desktop/install/mac-install/)
- [Docker for Linux](https://docs.docker.com/desktop/install/linux-install/)

## Act Instructions

### Windows
1. **Using WinGet**:
   ```powershell
   winget install nektos.act
   ```
1. **Using Scoop**:
   ```powershell
   scoop install act
   ```
### Linux/MacOS
1. **Using Homebrew**:
   ```sh
   brew install act
   ```
### Verification
To verify that `act` has been installed correctly, run:
```sh
act --version
```

## Localstack Instructions

The quickest way get started with LocalStack is by using the LocalStack CLI. It allows you to start LocalStack from your command line. 

### Windows
1. **Download binary**: Go to the [Localstack CLI Installation](https://docs.localstack.cloud/getting-started/installation/) and download binary in Windows Installation.
   
2. **Install Localstack CLI **:
   - Extract the `localstack-cli-3.5.0-windows-*.zip` file.
   - Run the setup file and follow the installation instructions.

### MacOS
1. **Using Homebrew**:
   ```sh
   brew install localstack/tap/localstack-cli
   ```
### Linux
- **For x86**:
   ```sh
   curl --output localstack-cli-3.5.0-linux-amd64-onefile.tar.gz \
    --location https://github.com/localstack/localstack-cli/releases/download/v3.5.0/localstack-cli-3.5.0-linux-amd64-onefile.tar.gz
   ```
- **ARM 64**:
   ```sh
   curl --output localstack-cli-3.5.0-linux-arm64-onefile.tar.gz \
    --location https://github.com/localstack/localstack-cli/releases/download/v3.5.0/localstack-cli-3.5.0-linux-arm64-onefile.tar.gz
   ```
- **Then Run**:
   ```sh
   sudo tar xvzf localstack-cli-3.5.0-linux-*-onefile.tar.gz -C /usr/local/bin
   ```
- **If Using Homebrew**:
   ```sh
   brew install localstack/tap/localstack-cli
   ```
### Verification
To verify that the `LocalStack CLI` was installed correctly, you can check the version in your terminal:
```sh
localstack --version
```


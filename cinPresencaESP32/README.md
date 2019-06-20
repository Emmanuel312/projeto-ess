Depois eu passo pra md.

# Configurações iniciais.
* Antes de setar o código precisa instalar as biliotecas do firebase, tutorial de download na seção de instalação do site
https://github.com/mobizt/Firebase-ESP32

* Após instalar as bibliotecas, abrir a ide do arduino 
  * Clicar no menu superior em ferramentas
  * Abrir Partition scheme
  * Selecionar Minimal spiff ...

    
# Código
  * Após setar a ide propriamente:
  * Na parte superior do código colocar:
    * Endereco Banco de dados
     #define FIREBASE_HOST ""
    * Chave do Banco de dados
    #define FIREBASE_AUTH ""
    * Nome rede wifi
    #define WIFI_SSID ""
    * Senha rede wifi
    #define WIFI_PASSWORD ""
    
    # Funções
      # Setup
         Seta as configurações iniciais do banco de dados, conecta a internet, e inicia o server do ble.
        
      # genUUID();
        * Gera um novo uuid, e o coloca no vetor char uuidStr[60];
        
      # appendNewUUID()
        * Envia um arquivo JSON para o banco de dados com o novo uuid e a timestamp, para o endereço path.
        
      # createAdvertising(int intervalToStartAdvertising = 2000, int timeOfAdvertising = 5000)
        * Cria um novo serviço para o servidor ble
        * Inicialmente chama a função genUUID(), para gerar um novo uuid.
        * Espera intervalToStartAdvertising milisegundos para adicionar o novo uuid após entrar na função, necessário para setar o novo serviço
        * Chama a função appendNewUUID(), para enviar o novo código uuid para o banco de dados junto com a timestamp.
        

> Projeto pessoal para estudar e experimentar Realidade Aumentada (RA) na web com um dispositivo mobile .
### 1. O que é
O objetivo é aprender a fundo as tecnologias por trás disso (three.js, WebXR e hit-test) testando uma ideia de cada vez:

- exibir um modelo 3D em RA no celular;
- detectar uma superfície plana (hit-test) e posicionar o objeto nela;
- interagir com o objeto por gestos (pinça para escalar) e botões (subir/descer);
- carregar modelos 3D externos (`.gltf` / `.glb`).

---
### 2. Requisitos
- **Node.js** 20 ou superior e **npm**.
- Um celular **Android** com **Google Chrome** e suporte a **ARCore** (Serviços do Google Play para RA).
- **adb** instalado no computador (`android-tools`), com **depuração USB** ativada no celular.
- **Git**, para clonar o repositório.


---
### 3. Como instalar e rodar

```bash
`# 1. Clonar o repositório`
`git clone https://github.com/Mordegb/Vr-lab-react.git`
`cd Vr-lab-react`

`# 2. Instalar as dependências`
`npm install`

`# 3. Rodar o projeto localmente`
`npm run dev`

`# 4. Com o celular conectado por USB, redirecionar a porta`
`adb reverse tcp:5173 tcp:5173`

`# 5. Com seu celular conectado abra o navegador e abra`
`http://localhost:5173`
```

observações:
- abra de preferencia no Chrome
- Escolha um do botões e clique para abrir o visualizador
- quando abrir , aponte a câmera procurando uma superfície plana, o objeto so vai aparecer quando posicionado corretamente sobre uma superficie plana

---
### 4. Sobre as bibliotecas

|  `react/react-Dom`   |                        base da aplicação                         |
| :------------------: | :--------------------------------------------------------------: |
|       `three`        |         Motor 3D: cenas, câmeras, geometrias e materiais         |
| `@react-three/fiber` |   Usar o three.js de forma declarativa, com componentes React    |
|  `@react-three/xr`   |          Integração com WebXR: sessão de RA e hit-test           |
| `@react-three/drei`  | Utilitários para o fiber, como o `useGLTF` para carregar modelos |

---
### 5. Funcionalidades

- **Mudança de escala**: da para mudar a escola de todos os objetos com um movimento de pinça com os dedos.
- **Movimentação**: ao clicar, quase todos os componentes se movimentam de alguma forma (a maioria so gira)
- **Pirâmide**: tem alem dos movimentos de pinça, tem  a funcionalidade de se movimentar em 3D em todos as direções de eixo, é so mover com 2 dedos.
- **Página de viewers**: grade de cards clicáveis, cada um com preview 3D que abre a página de RA da respectiva forma.
- **Posicionamento em superfícies reais**: o objeto é colocado sobre um plano detectado pela câmera (hit-test).

---
### 6. Como baixar o android-tools

#### Base debian (zorin, mint, ubunto e etc...):
```bash
sudo apt update && sudo apt install android-sdk-platform-tools && udo apt install android-sdk-platform-tools-common
```

#### Base fedora:
```bash
sudo dnf install android-tools
```


#### Base Arch(Arch linux, CachysOS,Manjaro):
```bash
sudo pacman -S android-tools
```
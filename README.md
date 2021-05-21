# Word Typing Game

## 해결전략

- **webpack 구축**

  1. css를 분리하여 export 하기 위해 MiniCssExtractPlugin을 사용하였음.
  1. 빌드할 때마다 생길 수 있는 쓰지 않는 요소들을 없애기 위하여 CleanWebpackPlugin을 사용하여 빌드할 때마다 폴더 안의 내용을 지우고 다시 불러올 수 있도록 설정함.
  1. html 파일도 템플릿처럼 기본적으로 사용할 수 있도록 하기 위하여 HtmlWebpackPlugin을 사용하였고, 내부에 template 값을 활용하여 지정한 html을 export할 수 있도록 설정함.

- **routing 구축**

  1. `/src/js/script/router.ts`에 라우터 관련 함수 정의
  1. 브라우저 주소의 hash를 사용하여 SPA를 구현하였음.
  1. hash가 #일 때는 메인 페이지로 이동하고, #result일 때는 결과화면을 보여주도록 함.
  1. SPA로 구현을 하였기 때문에 새로고침 시에 입력된 데이터가 사라지는 현상이 있어, localstorage를 활용하였음.
  1. 메인 페이지로 가는 경우에는 데이터를 초기화 할 수 있도록 html에 데이터를 삽입하기 전에 처리함.
  1. `/src/js/pages`폴더 안에는 html 형태의 string을 리턴할 수 있도록 함수로 구현하였으며, 기본적인 세팅을 할 수 있도록 데이터를 파라미터로 받아 따로 querySelector를 통해서 DOM을 조작하는 일이 없도록 초기화하는 기능을 구현하였음.
  1. div root에 innerHTML로 html이 삽입이 되고 난 다음에는 해당 html에 이벤트를 초기화할 수 있는 함수를 뒤에 구현하였음.

- **타이핑 게임 데이터 해결 전략**

  1. 먼저 데이터를 담기 위하여 class를 사용하여 하나의 객체가 데이터로서 움직일 수 있도록 구현하였음.
  1. 맨 처음 생성되는 game 객체는 `/src/index.ts`에 정의 되었고, hash값이 변경되거나 페이지가 로드 되었을 때, 이 game 객체의 정보를 render함수를 통해서 하위의 메뉴들(홈, 결과)에 넣어질 수 있도록 정의하였음.
  1. 먼저 페이지가 로드가 될 때, 브라우저 주소의 해시를 가지고와 이를 render함수에 game객체와 함께 호출함.
  1. 호출한 다음에 결과에 맞게 html을 렌더하고 이벤트를 초기화 하는 함수를 호출함
  1. 만약 #result 주소로 바로 이동하는 경우에는 localStorage에 데이터가 없으면 메인페이지로 리다이렉트하도록 정의함.

- **게임 실행 및 동작 해결 전략**

  1. 게임의 정보를 처음부터 불러오지 않고, 버튼 클릭에 대한 이벤트 정의와 값을 입력할 수 있는 input 에 대한 키 관련 이벤트 정의를 mainInit()에서 진행함.
  1. answerElem에서는 엔터를 쳤을 때, 문제에 대한 답과 제출한 답이 올바른지 체크하는 함수를 호출함.
  1. 게임을 실행하였을 때는 onStartClick함수가 실행됨.
     1. 게임이 실행되었을 때, getQuestions 함수를 통해서 api 서버에서 문제를 불러옴
     1. 완료가 되면 setStartGame함수를 통해서 시작하였을 때, game객체에 불러온 문제와 게임의 시작을 알리는 isGameStarted를 변경하여 저장함.
     1. 카운트다운을 시작할 수 있는 setCountdown함수를 실행함.
     1. setInterval을 활용하여 1초마다 카운트다운 값이 줄어들 수 있도록 변경함.
     1. 만약 시간이 0이 되었을 때, 문제를 풀지 못하는 경우로 간주하고 점수를 1점 깍고, 실패의 횟수를 하나 늘려 객체에 데이터를 저장함.
     1. 깍인 점수는 화면에 보여질 수 있도록 함수를 호출함.
     1. 그리고 다음 문제로 넘어갈 수 있는 moveToNextGame 함수를 호출함.
     1. 받아온 문제의 첫 문제를 화면에 출력하고, 게임시작 버튼을 초기화 버튼으로 변경함(버튼의 텍스트를 변경)
  1. 게임의 문제를 맞추거나 시간이 다 되어 다음 문제를 출력하는 경우에는 moveToNextGame을 호출함.
     1. 게임의 문제를 맞추는 경우에는 game객체에 responseTime 리스트에 응답시간을 추가함. (응답시간은 `문제에 대한 카운트 다운 - 남은 시간`으로 설정)
     1. 게임 객체에 있는 setNextGame함수를 호출하는 데, 여기에서는 객체의 count를 1증가 시키고, 다음 문제가 없는 경우네는 isGameStarted를 false로 변경함.
     1. isGameEnd함수를 통해서 게임이 끝난는지를 확인하고, 만약 끝난 경우에는 #result 페이지로 이동하게 됨. 아니면, false를 리턴함.
     1. 다음 문제를 출제할 수 있는 화면을 구성하고 입력 Input의 value를 지우고 다시 카운트 다운을 할 수 있는 setCountdown함수를 호출함.
     1. 만약 초기화 버튼을 누르게 되면 onResetClick 함수를 호출하게 되고 화면에서 초기화된 화면을 보여주고 game객체의 setResetGame함수를 호출하여 객체의 데이터를 초기화 함.
  1. 게임이 끝나면 #result 페이지로 이동함.
     1. 게임이 끝난 경우에는 game객체 안에서 calcAvgTime을 통하여 responseTime 리스트에 들어있는 함수들의 평균값을 내어 avgTime 데이터를 저장함.
     1. game객체의 최종 점수와 평균시간(avgTime)은 localStorage에 저장함.
     1. result페이지에서는 localStorage에 담긴 정보를 파싱하여 데이터를 render할 수 있도록 결과 페이지 HTML 리턴함수를 호출함.
     1. 다시시작 버튼을 누르면 메인페이지로 이동이 되며 localStorage에 있는 정보는 지워지게 되고 시작 화면이 나타남.

- **테스팅**
  1. 테스트는 `Jest`를 활용하여 테스트를 진행함.
  2. 게임을 실행하거나 초기화하거나 게임을 진행하면서 문제의 답이 맞거나, 다음 문제로 이동하는 등의 관련 함수를 테스팅 할 수 있도록 테스트를 구축함.

---

## 프로젝트 구조

### 구조

- `__mocks__`
  : test set의 mock 파일 모아 놓은 폴더
- `src`
  - `assets`
    : html 템플릿 파일을 둔 폴더
  - `css`
    : css 정의 폴더
  - `data`
    : 변경될 수 있는 텍스트 데이터를 모아놓은 폴더
  - `js`
    - `api`
      : 외부 api를 연결할 수 있는 함수의 파일을 모아놓은 폴더
    - `class`
      : game 객체를 정의한 클래스 파일을 모아놓은 폴더
    - `pages`
      : html을 렌더할 수 있는 함수를 호출하는 파일을 모아놓은 폴더 (home.ts는 메인페이지, result.ts는 결과 페이지의 html을 렌더할 수 있는 함수로 정의됨)
    - `script`
      : 실제 버튼이나 로직이 동작할 수 있는 함수들의 파일을 모아놓은 폴더 (common.ts는 공통함수, main.ts는 메인페이지 관련 함수, result.ts는 결과 페이지와 관련된 함수)
    - index.ts
      : game 객체를 생성하고, 브라우저의 주소의 해시가 변경되거나 데이터가 로드되었을 때의 전체적인 이벤트를 정의한 파일
- `test`
  : Jest를 활용하여 테스트를 구현한 파일을 모아놓은 폴더

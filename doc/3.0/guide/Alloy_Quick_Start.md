## 개요

이 가이드 문서는 알로이 커맨드-라인 인터페이스(이하 CLI)를 설치하고, 간단히 프로젝트를 만드는 방법을 소개한다.

## 커맨드-라인 인터페이스 설치

타이타늄 3.0 부터 알로이 CLI와 플러그인이 자동으로 설치된다. 자세한 내용은 [타이타늄 스튜디오 빠른 시작 가이드][1]를 참고한다.

설치에 문제가 있거나 CLI를 타이타늄 스튜디오와는 독립적으로 설치하고 싶다면 아래 설명에 따라 직접 설치한다.

### 수동 설치 방법

> 알로이 CLI를 설치하려면 타이타늄 SDK 2.1.x 이상 버전이 먼저 설치되어 있어야한다.

 1. Node.js를 설치한다. [다운로드 링크](http://nodejs.org/#download), Node.js에는 알로이를 설치하기 위한 npm 패키지 매니저가 포함되어 있다. 
 2. 커맨드 콘솔창에 다음과 같이 입력해 설치한다.

    > $ sudo npm install -g alloy

위와 같이 입력하면 기본적으로 알로이 최신 버전을 설치하게 된다. 특정 버전을 설치하고 싶다면 'alloy' 다음에 골뱅이('@')를 붙여서 버전을 표시한다. 예로들면 다음과 같다.

    <pre><code>$ sudo npm install -g alloy@0.2.35
    </code></pre>

## 프로젝트 생성하기

### 타이타늄 스튜디오에서 생성하기

타이타늄 스튜디오에서 알로이 프로젝트를 생성하는 과정은 다음과 같다.

 1. 메뉴에서 **File > New > Titanium Project**를 선택하면 **New Titanium Project** 생성창이 나타난다. 
 2. **사용 가능한 탬플릿(Available Templates)** 박스에서 **Alloy**를 선택하고 **Next** 버튼을 클릭한다. 
 3. 필요한 정보를 모두 입력하고 **Finish** 버튼을 클릭한다.

이제 알로이 프로젝트가 생성된다. 참고로 Project Explorer와는 달리 App Explorer 창에는 *Resources* 폴더가 숨겨져 있을 것이다.

> 위 내용은 타이타늄 스튜디오 3.0 이상에서만 해당하는 내용이다. 이전 버전에서는 새로운 타이타늄 프로젝트를 생성한 후에 해당 프로젝트 루트 폴더에서 *alloy new* 라고 커맨드라인 명령을 입력해야한다.

### CLI를 이용해 생성하기

> 타이타늄 3.0 부터 타이타늄 CLI가 같이 설치된다. 자세한 정보는 [타이타늄 커맨드-라인 인터페이스 문서][2]를 참고한다. 
> 타이타늄 2.1.x 버전에서는 *titanium.py* 파일을 다른 이름으로 바꿔야한다. 타이타늄 파이썬 스크립트를 이용해 설치하는 자세한 내용은 [레거시 커맨드-라인 인터페이스][3] 문서를 참고한다.

알로이 프로젝트를 생성하려면 커맨드 명령창에 다음과 같이 입력한다.

    $ titanium create --name=appname --id=com.domain.appname --platform=android,ipad,iphone,mobileweb
    $ cd appname
    $ alloy new

위와 같이 입력하면 *appname* 폴더에 알로이 프로젝트 구조가 생성된다.

## 간단한 예제

다음 예제는 키친싱크(KitchenSink) 앱에 있는 image\_view\_file.js 파일을 알로이 프로젝트로 변환한 것이다.

예제 코드를 보려면 키친싱크 앱 소스에서 *Base UI* 탭을 클릭하고, **Views > Images Views > Image File** 을 열어본다.

### 뷰(View)

뷰 파일은 GUI 구조를 선언한다. 예를 들어 아래 코드는 윈도우에 이미지와 라벨을 정의한다.

*app/views/index.xml* 파일을 아래와 같이 수정한다.

    <Alloy>
    <Window>
        <ImageView id="imageView" onClick="clickImage"/>
        <Label id="l">Click Image of Apple Logo</Label>
    </Window>
    </Alloy>


### 스타일(Style)

스타일 파일 포맷은 뷰 파일 안에 있는 컴포넌트들을 구성한다. 예를 들어 아래 코드는 윈도우의 배경색과 위치, 라벨의 색과 크기 그리고 이미지의 위치와 크기를 정의한다.

*app/styles/index.tss* 파일을 아래와 같이 수정한다.

	"Window": {
    	backgroundColor:"white"
	},
	"#l":{
   		bottom:20,
    	width: Ti.UI.SIZE,
    	height: Ti.UI.SIZE,
    	color:'#999'
	},
	"#imageView":{
    	image:"/images/apple_logo.jpg",
    	width:24,
    	height:24,
    	top:100
	}

### 컨트롤러(Controller)

컨트롤러 파일은 사용자 입력에 반응하는 프리젠테이션 로직을 포함한다. 예를 들어, 아래 컨트롤러 코드는 애플리케이션이 시작되서 윈도우가 열리고, 그 안에 있는 이미지를 사용자가 클릭했을 때 얼럿창을 띄운다.

*app/controllers/index.js* 파일을 아래와 같이 수정한다.

	function clickImage(e) {
    	Titanium.UI.createAlertDialog({title:'Image View', message:'You clicked me!'}).show();
	}

	$.index.open();

### 에셋(Asset)

*app/asset/images* 폴더를 생성하고 [키친싱크][4] 프로젝트에서 [apple\_logo.jpg][5] 파일을 복사해 넣는다. 그리고 이 파일은 알로이 빌드가 끝나면 *Resources/images/apple*logo.jpg* 위치로 복사된다.

### 컴파일과 실행

#### 타이타늄 스튜디오로 빌드하기

> 모바일 웹 플랫폼의 경우 CLI로 애플리케이션을 컴파일한 후에 타이타늄 스튜디오에서 실행한다.

*App Explorer* 창에서 **Run** 버튼을 클릭하고, 애플리케이션을 실행할 장치를 선택한다. 그러면 알로이는 알로이 프로젝트 파일(app폴더 하위의 파일들)을 타이타늄 프로젝트 파일로 생성한다. 그리고 이렇게 생성된 파일을 타이타늄 스튜디오에서 컴파일을 하고 시뮬레이터에서 실행하게 된다.

#### CLI를 이용해 빌드하기

> 모바일 웹 플랫폼의 경우 컴파일 한 후에 타이타늄 스튜디오에서 애플리케이션을 실행한다. 
> 안드로이드 플랫폼의 경우 명령어를 실행하기전에 에뮬레이터를 먼저 실행시켜야한다.

콘솔창을 열고, 프로젝트 루트 디렉토리에서 다음과 같이 입력한다.

	$ alloy compile
	$ alloy run [platform]

[1]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Quick_Start
[2]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Titanium_Command-Line_Interface_Reference
[3]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Legacy_Command-Line_Interface
[4]: https://github.com/appcelerator-developer-relations/KitchenSink
[5]: https://raw.github.com/appcelerator-developer-relations/KitchenSink/master/Resources/images/apple_logo.jpg




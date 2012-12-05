## 개요

이 문서는 알로이 관련된 중요한 개념인 모델-뷰-컨트롤러 프레임워크와 관습에 따른 설정(convention-over-configuration) 설계, 위젯, 내장된 Backbone.js와 Underscore.js에 대해 알아본다.

## 모델-뷰-컨트롤러

알로이 애플리케이션을 다음과 같이 3가지 컴포넌트로 분리한 MVC 패터다임을 활용한다.

 - **모델** 비즈니스 로직과 규칙을 제어하고, 애플리케이션의 상태와 데이터를 담당한다.  
 - **뷰** 사용자에게 GUI를 제공하고, 데이터를 표현하고, 데이터 모델과 상호작용해서 사용자에게 보여주는 역할을 담당한다.
 - **컨트롤러** 모델과 뷰 컴포넌트를 이어주는 가교 역할을 하며, 애플리케이션 로직을 형성한다. 

달력 애플리케이션을 예로 들면, 모델은 이벤트와 알림, 초대자와 연락처 등이 포함된다. 그리고 뷰는 이런 달력 데이터를 화면에 보여주어 사용자가 이벤트를 추가할 수 있도록 도와준다. 
알림의 경우 컨트롤러는 모델 데이터를 확인해서 사용자에게 보여줄 '알림'뷰를 실행시켜준다. 이벤트를 추가하는 경우에도 컨트롤러는 '이벤트 추가'뷰를 열고, 사용자가 입력한 이벤트를 이벤트 모델에 추가해준다. 

MVC는 코드를 기능별로 나누어 재사용할 수 있는 잇점이 있다. 예를 들어, 모델 데이터의 변경 없이 컨트롤러 코드를 거의 유사하게 만들어 서로 다른 장치에 올라가는 뷰를 다로 만들수있다. 

### 알로이: Backbone을 내장한 MVC 프레임워크

Backbone.js는 경량 MVC 프레임워크로써 원래는 웹 애플리케이션을 대상으로 설계되었다. 알로이 모델은 이런 Backbone.js를 기반으로 만들어졌기 때문에 Backbone의 모델과 컨트롤러 API를 그대로 사용할수있다는 장점이 있다. 모델은 자바스크립트 파일로 정의해서 JSON 객체로 내보낼 수 있고, Backbone의 모델과 콜렉션(collections)의 기능을 확장해서 만든다. 모델 객체를 만드는 자세한 내용은 [알로이 모델][1]을 참고한다. 그리고 Backbone.js에 대한 자세한 내용은 http://backbonejs.org 를 참고한다.

알로이 뷰는 타이타늄 UI 컴포넌트로 만든다. XML 마크업을 이용해 뷰를 정의할수 있으며 알로이 타이타늄 스타일 시트(.tss)를 이용해 스타일링 할수도 있다. 그리고 이렇게 정의된 코드로 뷰를 만드는데, 보다 자세한 내용은 [알로이 뷰][2]를 참고한다. 

알로이 컨트롤러는 보통 알로이 뷰와 1대1로 맵핑된다. 컨트롤러는 모든 뷰 컴포넌트에 접근할수있고, Backbone.js의 이벤트 API를 사용할 수 있다는 장점이 있다. 보다 자세한 내용은 [알로이 컨트롤러][3]를 참고한다.

추가로, 알로이는 배열이나 객체를 순회하는 유틸리티 헬퍼 함수가 대거 포함된 Underscore.js도 내장하고 있다. 자세한 내용은 http://underscorejs.org/ 를 참고한다. 

## 관습에 의한 설정

알로이는 개발을 단순화하기 위해서 별도의 설정파일을 두는 대신에 정해진 디렉토리 구조와 네이밍 규칙을 이용해 앱을 구성한다. 그래서 알로이는 특정 위치에 있는 파일을 찾으려고 한다. 예를 들어 제네레이션 타임에 *app/views/index.xml*과 *app/controllers/index.js* 파일을 찾고 추가로 *app/styles/index.tss* 파일도 찾는다. 

알로이 프로젝트를 구성하는 폴더 목록과 파일은 다음과 같다. 

	app             모델, 뷰, 컨트롤러와 애플리케이션의 모든 리소스 파일이 포함되고, 개발은 이 폴더에서만 이루어진다.
	                자세한 내용은 아래 상세 목록을 확인한다.
	app/alloy.jmk   설정 파일을 만든다. 
	                자세한 내용은 [설정 파일 만들기(alloy.jmk)][4]를 참고한다.
	app/alloy.js    미리 설정된 컴포넌트를 사용하기 위한 초기화하거나 메인 컨트롤러가 실행되기전에 알로이 메소드를 덮어쓰는 용도로 사용한다. 
	                자세한 내용은 [초기화 파일(alloy.js)][5]를 참고한다.
	app/config.json 프로젝트 설정파일이다. 
	                자세한 내용은 [프로젝트 설정 파일(config.json)][6]을 참고한다. 
	app/assets      Resources 폴더에 그대로 복사되는 폴더로 이미지나 기타 파일을 여기에 넣는다. 
	                여기에 추가된 파일은 'app/assets'이란 경로 없이 코드에 쓸수 있다. 
	app/controllers 컨트롤러는 finename.js 형식으로 만들고, app/views/filename.xml과 맵핑된다. 
	                자세한 내용은 [알로이 컨트롤러][7]를 참고한다. 
	app/lib         애플리케이션에서 쓰는 라이브러리 코드가 포함되고, 보통 CommonJS 형식으로 작성한다. 
	                자세한 내용은 [라이브러리 코드][8]를 참고한다. 
	app/migrations  <DATETIME>_filename.json 형식의 데이터베이스 마이그레이션 파일을 포함한다. 
	                자세한 내용은 [마이그레이션][9]을 참고한다. 
	app/models      filename.js 형식의 모델 파일을 포함한다. 
	                자세한 내용은 [알로이 모델][10]을 참고한다.
	app/styles      filename.tss 형식의 뷰 스타일 파일을 포함한다. 이 파일은 app/views/filename.xml 뷰에 적용된다. 
	                자세한 내용은 [타이타늄 스타일 시트][11]를 참고한다. 
	app/themes      애셋과 전체 GUI의 스타일을 변경할수있는 테마를 포함한다. 
	                자세한 내용은 [테마][12]를 참고한다. 
	app/views       filename.xml 형식의 뷰를 갖고, 이에 상응하는 app/controllers/filename.js와 app/styles/filename.tss는 선택사항이다. 
	                자세한 내용은 [알로이 XML 마크업][13]을 참고한다. 
	app/widgets     위젯 파일을 포함한다. 각 위젯은 자신만의 app-like 형식의 폴더 구조를 갖는다. 
	                자세한 내용은 [위젯][14]을 참고한다. 
	i18n            국제화와 지역화 파일을 포함하고, 타이타늄 애플리케이션과 사용법은 동일하다. 
	                자세한 내용은 [국제화][15]를 참고한다.
	Resources       app 디렉토리에 있는 소스를 알로이가 제너레이터 해서 만들어진 타이타늄 파일이 들어간다. 빌드할때마다 모든 파일들을 다시 쓰게 된다. 
	                자세한 내용은 [컴파일 프로세스][16]를 참고한다.


참고: lib 폴더와 migrations, themes 그리고 widgets 폴더는 자동으로 생성되지 않는다. 이 중에서 migrations와 widgets 폴더는 해당 요소가 하나라도 있다면 알로이 커맨드-라인 인터페이스를 통해 해당 폴더가 만들어진다. 하지만 lib와 themes 폴더는 직접 만들어야한다. 

프로젝트를 생성할때 alloy.jmk 파일도 자동으로 생성되지 않는다. 이 파일을 만드려면 커맨드 라인 인터페이스를 이용한다. 

### 플랫폼마다 다른 리소스

컨트롤러와 뷰 그리고 스타일은 플랫폼마다 다른 리소스를 가질 수 있고, 플랫폼 마다 다른 리소스는 'android', 'ios', 'mobileweb'과 같은 폴더 이름이 붙는다. 예를 들어, iOS에만 있는 뷰와 Android에만 있는 컨트롤러는 다음과 같이 표현할수있다. 
 
 - app
   - controllers
     - android
        - index.js
     - index.js
   - views
     - ios
        - index.xml
     - inex.xml

또 다른 방법으로, 별도로 정의된 속성 값을 이용해 컨트롤러 코드안에서 분기 처리할 수 있다. 마찬가지로 뷰 코드안에서도 스타일 속성을 이용해 플랫폼 별로 컴포넌트를 제어할 수 있다. 자세한 내용은 [컨트롤러 분기 코드][1]와 [뷰 분기 코드][2]를 참고한다. 

추가로 *assets* 폴더에 설정한 플렛폼별 특정 파일과 이미지들은 타이타늄 프로젝트에 있는 'Resources'폴더에 구조에 맞게 배치된다. 자세한 내용은 [플랫폼별 리소스 폴더][19]를 참고한다.

## 위젯

위젯은 위젯 그 자체로 필요한 리소스를 모두 포함한 컴포넌트를 이야기하는데, 알로이를 이용해 작성하면 보다 쉽게 타이타늄 프로젝트에 넣을 수 있다. 뿐만아니라 다양한 애플리케이션에서 재사용하거나 같은 애플리케이션 안에서 여러번 재사용하기도 쉽다. 위젯은 자기 자신만의 모델과 뷰 그리고 컨트롤러를 가진다. 물론 스타일과 asset도 가지고 있고 알로이 프로젝트의 app 폴더와 같다. 

위젯 사용에 대한 자세한 내용은 [위젯 삽입하기][20]를 참고한다. 

위젯을 만들고 싶다면 [위젯 만들기][21]를 참고한다. 

이미 만들어진 위젯을 사용하고 싶다면, [알로이 API 문서][22]나 [알로이 github 저장소][23]를 살펴보자. 

## 빌드인

알로이는 애니메이션, 문자열 조작, display unit conversion과 같은 간단하고 유용한 함수들을 추가로 내장하고 있다. 지금부터 이런 유틸리티들을 '빌트인'이라고 부르겠다. 이 유틸리티를 사용하려면, 컨트롤러에서 'alloy'를 루트로 *require* 함수를 호출해야한다. 예를 들어 애니메이션 함수를 이용해 'shake'버튼을 클릭했을때 현재 뷰를 흔들리게 하고 싶다면 다음과 같은 코드를 컨트롤러에 삽입힌다.
	
	var animation = require('alloy/animation');
	$.shake.on('click', function(e) {
		animation.shake($.view);
	});

자세한 사용법은 [알로이 빌드인 API 문서][22]를 참고하자.

## 컴파일 과정 

이번 섹션은 알로이 커맨드 라인 인터페이스가 app폴더에 있는 파일을 어떻게 *Resources* 폴더에 있는 타이타늄 프로젝트로 변환하는지에 대해 다룬다. 

### 초기화 

*Resources* 폴더는 빌드되기 전에 먼저 초기화 된다. 하지만 기존 *Resources* 폴더에는 있지만, app/assets 폴더에 없는 경우 해당 폴더와 컨텐츠는 제거되지 않는다.

### 알로이 프레임워크와 Asset 그리고 라이브러리

Backbone.js와 Underscore.js, 동기식 어댑터와 기본 컨트롤러 클래스 같은 알로이 프레임워크 파일들은 *Resources/alloy* 폴더에 복사된다. alloy.js와 같이 알로이 프로젝트를 실행하는데 필요한 알로이 기본 라이브러리는 Resources 폴더에 복사된다.  

*project.json*과 같은 프로젝트 설정파일은 Resources/alloy/CFG.js 에 복사된다. 
 
*asset*과 *lib*폴더에 있는 파일들은 테마(theme)안에 있는 assets폴더 뿐만 아니라 *Resources* 폴더에도 복사된다. 

### 빌드 설정 

알로이 빌드 설정 (*alloy.jmk*) 파일이 있다면 로드해서 파일에 정의된대로 'pre:compile' 테스크가 실행된다.

### 모델\-뷰\-컨트롤러 그리고 위젯 생성

모델 생성과정에서 컴파일러는 모델에 해당하는 자바스크립트 파일을 만들어 *Resources/alloy/models* 폴더에 복사한다. 

위젯 생성과정에서 컴파일러는 위젯에 해당하는 뷰와 컨트롤러 파일을 만들어 *Resources/alloy/widgets* 폴더에 복사한다. 

뷰와 컨트롤러에 있는 스타일뿐만 아니라 테마 스타일 폴더와 *app.tss* 에 있는 전역 스타일도 모두 컴파일러가 해석해서 해당하는 *Resources/alloy/controllers* 폴더에 복사한다. 

### 메인 애플리케이션

알로이는 템플릿을 이용해 app.js 파일의 기본 구조를 만든다. 이렇게 만들어진 구조는 일부 알로이 모듈과 메인 뷰-컨트롤러인 index.js 파일을 필요로 한다. 초기화(*alloy.js*) 파일이 있다면, 이 파일에 있는 모든 내용을 메인-뷰 컨트롤러가 초기화되기 직전에 app.js 파일에 복사한다.  

빌드 설정 파일에 뭔가가 정의되어 있다면 *Resources* 폴더를 만들기 전에 'compile:app.js' 테스크를 실행한다. 

### 코드 최적화

코드는 UglifyJS를 통해 최적화 된다. 코드 뷰티파이는 선택사항이다.

플랫폼별로 정의된 코드는 컴파일될때 모두 실행되는 것은 아니고 해당 플랫폼 별로 컴파일될때 필요없는 코드는 제거된다. 예를 들어, iOS용 코드 섹션은 안드로이드 플랫폼으로 컴파일 될때 모두 제거된다. 

필요한 알로이 빌트인 라이브러리는 *Resources/alloy* 폴더에 복사되고 앞에서와 마찬가지로 최적화 된다. 

마지막으로 빌드설정 파일에 'post:compile'테스트가 정의되어 있으면 실행된다. 
 

[1]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Models
[2]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Views
[3]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Controllers
[4]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Build_Configuration_File_(alloy.jmk)
[5]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Controllers-section-34636384_AlloyControllers-InitializerFile%28alloy.js%29
[6]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Project_Configuration_File_(config.json)
[7]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Controllers
[8]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Controllers-section-34636384_AlloyControllers-LibraryCode
[9]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Models-section-34636390_AlloyModels-Migrations
[10]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Models
[11]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Styles_and_Themes-section-35621526_AlloyStylesandThemes-TitaniumStyleSheets
[12]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Styles_and_Themes-section-35621526_AlloyStylesandThemes-Themes
[13]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_XML_Markup
[14]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Concepts-section-34636240_AlloyConcepts-Widgets
[15]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Internationalization
[16]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Concepts-section-34636240_AlloyConcepts-CompilationProcess
[17]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Controllers-section-34636384_AlloyControllers-ConditionalCode
[18]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_XML_Markup-section-35621528_AlloyXMLMarkup-ConditionalCode
[19]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Supporting_Multiple_Platforms_in_a_Single_Codebase-section-29004890_SupportingMultiplePlatformsinaSingleCodebase-Platform-specificresources
[20]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_XML_Markup-section-35621528_AlloyXMLMarkup-ImportingWidgets
[21]: http://docs.appcelerator.com/titanium/3.0/#!/guide/Alloy_Widgets-section-35621514_AlloyWidgets-CreatingWidgets
[22]: http://docs.appcelerator.com/titanium/3.0/#!/api
[23]: https://github.com/appcelerator/alloy/tree/master/widgets

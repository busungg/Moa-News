## 1. flex item 속성

### 1.1. flex-basis

css에서 요소의 너비는 width로 정의하여 사용했으나 플렉스를 사용하면 flex item의 너비는 flex-basis를 사용하여 너비를 지정할 수 있습니다.  
flex-basis 속성은 너비 값을 정의하고 플렉스 항목의 초기 크기를 설정합니다.

### 1.2. flex-grow

flex-grow는 flex item의 너비를 늘어나도록 정의해 줄 수 있는 속성 입니다.  
이 속성은 양수, 정수값을 사용하고 이 값은 남는 공간 중 얼마를 지정된 flex 항목에 분배해야 하는 지 그 정도를 제어합니다.  
flex-grow: 0;은 기본값으로 flex container 너비에 맞춰서 늘어나지 않는다는 의미입니다.

#### 주의 (flex-basis와 flex-grow)

flex-grow: 0;일 경우에 flex container 너비를 기준으로 늘어나지 않기 때문에 각각의 아이템들의 너비 지정이 가능합니다.  
하지만 flex-grow: 1;과 같이 1이상의 값을 가지게 되면 flex container 너비를 기준으로 확장하라는 의미여서 width, flex-basis의 정의가 무시됩니다.

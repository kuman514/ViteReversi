# ViteReversi

- Vite + React + Yarn + Zustand로 만든 로컬 2인용 오델로 앱
- 가족이나 친구끼리 모바일/PC에 구애받지 않고 설치 없이 즐기는 오델로 게임이 필요함에 따라 제작하게 됨.
- [앱 사용해보기](https://vite-reversi.vercel.app/)

# 사용한 이유

- Vite: `create-react-app`을 사용하는 것이 아닌, React 프로젝트를 직접 설정해보고 더욱 빠르게 번들링 하기 위해 사용함.
- Zustand: `Action`같은 추가적인 선언 및 정의를 일일히 해야 하는 `Redux`나 `observable` 속성을 꼭 추가해줘야 작동하는 `MobX`와는 달리, 코드가 간결하고 함수형 컴포넌트 이외의 부분에도 쉽게 사용할 수 있어, 구현 및 유지보수에 용이할 것으로 판단하여 사용함.

# 업데이트 내역

- `Feb 12, 2023`: `v1.0.0` 초기 배포
- `Feb 24, 2023`: `v1.0.1` UI 버튼의 모양이 화면 비율과 크기에 따라 더 유연하게 조정됨
- `Apr 22, 2023`: `v1.1.0` 리플레이 기능 추가
- `Apr 28, 2023`: `v1.1.1` 게임이 오델로 룰을 제대로 따라가도록 수정
- `Jul 03, 2023`: `v1.1.2` 타이틀이 더 이상 버전을 표시하지 않음
- `Jul 20, 2023`: `v1.2.0` 패스 발생 시 스낵바 토스트로 표시
- `Aug 04, 2023`: `v1.2.1` 스토어에서 필요한 멤버만 받아옴으로써 불필요한 재렌더링 감소
  - https://github.com/pmndrs/zustand#fetching-everything
  - https://github.com/pmndrs/zustand/discussions/913
  - https://stackoverflow.com/questions/68609189/fetching-multiple-states-with-zustand-react-shorthand-syntax

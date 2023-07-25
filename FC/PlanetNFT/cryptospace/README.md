## PLANET NFT

- 준비
  - 웹 브라우저 메타마스크 설치
  - 각 경로(Cryptospace, Cryptosapce-contract)의 package.json 라이브러리 설치 (npm install)  <br><br>


- 실행  
    /Crytospace-contract :
    - `npx hardhat node` (노드 실행)
    - `npx hardhat run scripts/deploy.ts --network localhost` (컨트랙트 배포)  <br><br>
      
    /Cryptospace :
    - `npm run dev` (next 개발모드)  <br><br><br>
 

    http://localhost:3000/ 접속  <br><br>

- 설명

  동영상
(https://drive.google.com/file/d/1i6y5g2_a1QBpRi9b19uwAleti8l5ZI8w/view?usp=drive_link)  <br>

  - 행성은 총 9개가 있으며 행성 메타데이터는 외부링크에서 가져옵니다.
  - 로컬호스트 네트워크를 사용하여 컨트랙트를 배포합니다.
  - 컨트랙트는 ERC721을 상속받아 사용하며 mintPlanet 함수를 추가하여 행성을 민팅하는 기능을 만들었습니다.
  - 민팅 페이지에서 0.01ETH(GO)를 지불하여 행성을 민팅 할 수 있습니다.
  - 민팅된 행성은 리스트 페이지에서 확인 할 수 있습니다.


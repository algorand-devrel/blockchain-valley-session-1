# 🎓 블록체인 밸리 X 알고랜드 개발자 부트캠프

## 🚩 세션 1: 알고킷 유틸리티 라이어버리를 사용해 여러 트랜잭션을 보내보자!

이번 세션에서는 다음과 같은 시나리오를 [algokit utils typescript](https://github.com/algorandfoundation/algokit-utils-ts) 라이브러리를 사용해서 구현해보겠습니다. 

앨리스는 애플 비전 프로가 너무 사고싶었지만 한국에서는 팔지 않아서 미국에 있는 크리스에게 대신 사달라고 부탁하기로 했다.
크리스는 앨리스에게 애플 비전 프로를 사주는 대신 이자 10%를 달라고 요구했다.
앨리스는 크리스의 조건에 동의했고 크리스는 앨리스 대신 밥으로 부터 애플 비전 프로를 구매하기로 했다. 밥은 크리스에게로부터 
돈을 받으면 앨리스에게 애플 비전 프로를 보내겠다고 했다. 

이 상상의 세계에서는 비전 프로의 가격은 100 ALGO입니다 (부럽다... ㅠ_ㅠ)

총 5문제로 구성되어 있고 각 문제에 "*** 여기에 코드 작성 ***" 부분에 코드를 작성하시면 됩니다.

## 체크포인트 1: 🧰 알고랜드 개발에 필요한 툴킷 설치

1. [AlgoKit 설치](https://github.com/algorandfoundation/algokit-cli/tree/main?tab=readme-ov-file#install).
2. [Docker 설치](https://www.docker.com/products/docker-desktop/). It is used to run a local Algorand network for development.
3. [Node.JS / npm 설치](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 

## 체크포인트 2: 💻 개발 환경 셋업

1. [이 리포를 fork하세요.](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)
2. Fork한 리포를 git clone하세요.
```bash
cd [DIRECTORY_OF_YOUR_CHOICE]
git clone [FORKED_REPO_URL]
```
3. VSCode에서 이 폴더를 열람하세요.
4. 열람 후 VSCode 터미널에서 `algokit project bootstrap all` 커맨드를 실행시켜 dependencies들을 설치하세요.
```bash
algokit project bootstrap all
```

리포 fork, clone 튜토리얼:
https://github.com/algorand-fix-the-bug-campaign/challenge-1/assets/52557585/acde8053-a8dd-4f53-8bad-45de1068bfda


## 체크포인트 3: 📝 문제를 해결하세요! 
총 5개의 문제가 있습니다. `index.ts` 파일로 가셔서 설명을 읽으시고 문제들을 해결해보세요. 문제를 다 해결한 뒤 터미널에서 `npm run start` 커맨드를 실행하시면 `index.ts`파일을 실행하실 수 있습니다. 실행 후 다음과 같은 콘솔 값이 출력되면 성공적으로 모든 문제를 해결하신겁니다!

1. Open Docker Desktop and launch Algorand localnet by running `algokit localnet start` in your terminal [For more info click me!](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/features/localnet.md#creating--starting-the-localnet). 
2. Make sure you are inside the `challenge` directory and run `npm run start` in your terminal to run the `index.ts` file and see the error message.
3. Go to `index.ts` file and fix the code to make it work. 
4. Run `npm run start` inside of `challenge` directory again to run the `index.ts` file.
If you see: `Payment of 1000000 microAlgos was sent to [receiver's address]` in the console, you successfully fixed the bug! 👏

**😰 Are you struggling?**
Here is a hint for you: https://developer.algorand.org/docs/sdks/javascript/

## Checkpoint 4: 💯 Submit your answer 

1. After fixing the bug, push your code to your forked Github repo and [make a PR to the original repo.](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) 
2. Inside the PR include:
   1. What was the problem?
   2. How did you solve the problem?
   3. Screenshot of your terminal showing the logged sentence. `Payment of 1000000 microAlgos was sent to [receiver's address]`

## Checkpoint 5: 🏆 Claim your certificate of completion NFT! 🎓

The Algorand Developer Relations team will review the submission and "approve" the PR by labeling it `Approved`. Once it's approved, we will share the magic link to claim your certificate of completion NFT in the comment of the PR! 

🎉 Congratulations on completing the challenge Algodev! Now on to the next one 💪

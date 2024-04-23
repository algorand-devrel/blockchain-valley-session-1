import * as algokit from '@algorandfoundation/algokit-utils';

/*
블록체인 밸리 X 알고랜드 개발자 부트캠프 코딩 과제 #1

이번 과제에서는 다음과 같은 시나리오를 algokit utils typescript 라이브러리를 사용해서 구현해보겠습니다. 
앨리스는 애플 비전 프로가 너무 사고싶었지만 한국에서는 팔지 않아서 미국에 있는 크리스에게 대신 사달라고 부탁하기로 했다.
크리스는 앨리스에게 애플 비전 프로를 사주는 대신 이자 10%를 달라고 요구했다.
앨리스는 크리스의 조건에 동의했고 크리스는 앨리스 대신 밥으로 부터 애플 비전 프로를 구매하기로 했다. 밥은 크리스에게로부터 
돈을 받으면 앨리스에게 애플 비전 프로를 보내겠다고 했다. 

이 상상의 세계에서는 비전 프로의 가격은 100 ALGO입니다 (부럽다... ㅠ_ㅠ)

총 5문제로 구성되어 있고 각 문제에 "*** 여기에 코드 작성 ***" 부분에 코드를 작성하시면 됩니다.
*/

async function main() {
    // 로컬 네트워크로 연결된 알고랜드 클라이언트 생성
    const algorand = algokit.AlgorandClient.defaultLocalNet();

    /*
    문제 1: 테스트에 사용할 앨리스, 밥, 크리스 계정 생성
    */

    // 문제 1 시작
    const alice = "*** 여기에 코드 작성 ***"
    const bob = "*** 여기에 코드 작성 ***"
    const chris = "*** 여기에 코드 작성 ***"
    // 문제 1 끝
    const accounts = [alice, bob, chris];
    
    /*
    문제 2: 3개의 계정에 120 알고씩 디스팬서로부터 송금하는 결제 트랜잭션을 작성하세요.

    디스팬서란? 디스팬서는 지금 연결된 네트워크(메인넷 제외)에서 알고를 대량 보유하고 있고 송금할 수 있는 계정입니다.
    */
    const dispenser = await algorand.account.dispenser();
    for (const account of accounts) {
        // 문제 2 시작
        "*** 여기에 코드 작성 ***"
        // 문제 2 끝
    }

    /* 
    문제 3:
    애플 비전 프로로 교환 가능한 NFT ASA를 아래 패러미터로 설정해서 생성하세요. 
    패러미터:
    - 에셋 이름: "Apple Vision Pro"
    - 단위 이름: "AVP"
    - 소수점: 0
    - 총 발행량: 1
    */
    // 문제 3 시작
    const createResult = "*** 여기에 코드 작성 ***"
    // 문제 3 끝

    // Get assetIndex from transaction
    const assetId = BigInt(createResult.confirmation.assetIndex!);

    /* 
    문제 4: 
    앨리스가 애플 비전 프로 ASA를 받을 수 있도록 Opt-in하세요.
    asa id는 위에서 생성한 assetId 변수를 사용하세요.
    */
    // 문제 4 시작
    "*** 여기에 코드 작성 ***"
    // 문제 4 끝

    /* 
    문제 5
    이번 문제에서는 알고랜드 레이어 1 기능인 어토믹 트랜잭션을 사용해서 3자 거래를 동시다발적으로 체결해보겠습니다.
    총 3개의 트랜잭션을 동시에 체결해야 합니다.
    - 트랜잭션 1: 크리스가 밥에게 100 ALGO 송금
    - 트랜잭션 2: 밥이 앨리스에게 애플 비전 프로 ASA를 송금
    - 트랜잭션 3: 앨리스가 크리스에게 110 ALGO 송금

    단계 1: 일단 밑에 보이는 3개의 변수 (chrisPayTxnParam, bobSendAssetTxnParam, alicePayTxnParam)에 
    각각의 트랜잭션을 위한 패러미터 객체를 생성하세요. 
    -> 여기서 트랜잭션 패러미터란 각각의 트랜잭션의 설정값을 의미합니다.
      node_modules/@algorandfoundation/algokit-utils/types/composer.d.ts 파일을 참고하시면 
      트랜잭션 종류에 따라 어떤 값들을 설정할 수 있는지 알 수 있습니다.

    단계 2: 생성한 3개의 트랜잭션 패러미터 객체와 algorand client의 newGroup() 메소드를 사용해서 어토믹 그룹을 
    생성한 후, 그 그룹에 각각의 트랜잭션을 추가하세요. 추가 방법은 `atomicGroup.`을 쳐보면 intellisense를 통해 
    어떠한 메서드들을 사용할 수 있는지 알 수 있습니다. 예를 들면
    `await atomicGroup.addPayment(chrisPayTxnParam)`과 같은 코드로 트랜잭션 1을 추가할 수 있습니다. 그 뒤로
    다른 두 트랜잭션도 위 코드 뒤에 이어서 추가할 수 있습니다. 그러고 나서 마지막에 .execute() 메소드를 호출하면 
    어토믹 그룹에 추가된 3개의 트랜잭션을 동시에 보낼 수 있습니다.
    */

    // 크리스가 밥에서 100 ALGO를 송금하는 트랜잭션 패러미터 객체 생성
    const chrisPayTxnParam = {
        sender: bob.addr,
        receiver: chris.addr,
        amount: algokit.algos(100),
    }

    // 밥이 앨리스에게 애플 비전 프로 ASA를 송금하는 트랜잭션 객체 생성
    // 문제 5 시작
    const bobSendAssetTxnParam = "*** 여기에 코드 작성 ***"

    // 앨리스가 크리스에게 110 ALGO를 송금하는 트랜잭션 객체 생성
    const alicePayTxnParam = "*** 여기에 코드 작성 ***"

    // 3개의 트랜잭션을 atomic transaction composer로 묶어서 전송
    const atomicGroup = algorand.newGroup()
    const result = await atomicGroup
        .addPayment(chrisPayTxnParam)
        "*** 여기에 코드 작성 ***"
    // 문제 5 끝


    console.log("아래 트랜잭션 ID를 가진 3개의 트랜잭션이 어토믹 트랜잭션으로 동시 체결됬습니다!", result.txIds)

    // 앨리스, 밥, 크리스의 계정 정보를 출력하여 정상적으로 수행되었는지 확인
    const aliceInfo = await algorand.account.getInformation(alice.addr)
    const aliceAssets = aliceInfo.assets ?? [];
    if (BigInt(aliceAssets[0].assetId) === assetId) {
        console.log("앨리스: 드디어 애플 비전 프로가 내손에...!! >.<")
    } else {
        console.log("앨리스: 애플 비전 프로 못 받았다 ㅠㅠ")
    }

    const bobInfo = await algorand.account.getInformation(bob.addr)
    const bobExpectedBalance = algokit.algos(120).valueOf() + algokit.algos(100).valueOf() - algokit.microAlgos(2000).valueOf()
    if (bobInfo.amount === bobExpectedBalance) {
        console.log("밥: 애플 비전 프로 필요 없었는데 크리스한테 100 ALGO 받고 잘 팔았다!")
    } else {
        console.log("밥: 100 ALGO 못 받았다 ㅠㅠ")
    }

    const chrisInfo = await algorand.account.getInformation(chris.addr)
    const chrisExpectedBalance = algokit.algos(120).valueOf() - algokit.algos(100).valueOf() + algokit.algos(110).valueOf() - algokit.microAlgos(1000).valueOf()
    if (chrisInfo.amount === chrisExpectedBalance) {
        console.log("크리스: 애플 비전 프로 잘 사고 앨리스한테 110 ALGO 받아서 돈 벌었다!")
    } else {
        console.log("크리스: 애플 비전 프로 못 샀거나 앨리스한테 110 ALGO 못 받았다 ㅠㅠ")  
    }

    // === 세 계정 정보 출력이 어떤 정보를 제공하는지 궁금하면 uncomment 후 실행해보세요! ===
    // console.log("Alice's Account:", await algorand.account.getInformation(alice.addr));
    // console.log("Bob's Account:", await algorand.account.getInformation(bob.addr));
    // console.log("Chris's Account:", await algorand.account.getInformation(chris.addr));
}
main()
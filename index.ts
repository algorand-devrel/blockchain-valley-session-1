import * as algokit from '@algorandfoundation/algokit-utils';

/*
코딩 과제

시나리오: 
앨리스는 애플 비전 프로가 너무 사고싶었지만 한국에서는 팔지 않아서 미국에 있는 크리스에게 대신 사달라고 부탁하기로 했다.
크리스는 앨리스에게 애플 비전 프로를 사주는 대신 이자 10%를 달라고 요구했다.
앨리스는 크리스의 조건에 동의했고 크리스는 앨리스 대신 밥으로 부터 애플 비전 프로를 구매하기로 했다.

비전 프로 가격: 100 ALGO
*/

async function main() {
    const algorand = algokit.AlgorandClient.defaultLocalNet();

    // 문제 1: 테스트에 사용할 앨리스, 밥, 크리스 계정 생성
    const alice = algorand.account.random()
    const bob = algorand.account.random();
    const chris = algorand.account.random();
    const accounts = [alice, bob, chris];
    
    // 3개의 계정에 120 알고씩 디스팬서로부터 송금. 디스팬서는 
    const dispenser = await algorand.account.dispenser();
    for (const account of accounts) {
        await algorand.send.payment({
            sender: dispenser.addr,
            receiver: account.addr,
            amount: algokit.algos(120),
        });
    }

    // 애플 비전 프로로 교환 가능한 NFT ASA 생성
    const createResult = await algorand.send.assetCreate({
        sender: bob.addr,
        assetName: "Apple Vision Pro",
        unitName: "AVP",
        decimals: 0,
        total: 1n,
    });

    // Get assetIndex from transaction
    const assetId = BigInt(createResult.confirmation.assetIndex!);

    // 앨리스가 애플 비전 프로 ASA를 받을 수 있도록 Opt-in
    await algorand.send.assetOptIn({
        sender: alice.addr,
        assetId,
    })

    // 크리스가 밥에서 100 ALGO를 송금하는 트랜잭션 패러미터 객체 생성
    const chrisPayTxnParam = {
        sender: bob.addr,
        receiver: chris.addr,
        amount: algokit.algos(100),
    }

    // 밥이 앨리스에게 애플 비전 프로 ASA를 송금하는 트랜잭션 객체 생성
    const bobSendAssetTxnParam = {
        sender: bob.addr,
        receiver: alice.addr,
        assetId,
        amount: 1n,
    }

    // 앨리스가 크리스에게 110 ALGO를 송금하는 트랜잭션 객체 생성
    const alicePayTxnParam = {
        sender: alice.addr,
        receiver: chris.addr,
        amount: algokit.algos(110),
    }

    // 3개의 트랜잭션을 atomic transaction composer로 묶어서 전송
    const atomicGroup = algorand.newGroup()
    const result = await atomicGroup
        .addPayment(chrisPayTxnParam)
        .addAssetTransfer(bobSendAssetTxnParam)
        .addPayment(alicePayTxnParam)
        .execute()

    console.log("아래 트랜잭션 ID를 가진 3개의 트랜잭션이 어토믹 트랜잭션으로 동시 체결됬습니다!", result.txIds)

    // 앨리스, 밥, 크리스의 계정 정보를 출력하여 정상적으로 수행되었는지 확인
    const aliceInfo = await algorand.account.getInformation(alice.addr)
    const aliceAssets = aliceInfo.assets ?? [];
    if (BigInt(aliceAssets[0].assetId) === assetId) {
        console.log("앨리스: 앗싸 애플 비전 프로 받았다!")
    } else {
        console.log("앨리스: 애플 비전 프로 못 받았다 ㅠㅠ")
    }

    const bobInfo = await algorand.account.getInformation(bob.addr)
    const bobExpectedBalance = algokit.algos(120).valueOf() + algokit.algos(100).valueOf() - algokit.microAlgos(2000).valueOf()
    if (bobInfo.amount === bobExpectedBalance) {
        console.log("밥: 앗싸 100 ALGO 받았다!")
    } else {
        console.log("밥: 100 ALGO 못 받았다 ㅠㅠ")
    }

    const chrisInfo = await algorand.account.getInformation(chris.addr)
    const chrisExpectedBalance = algokit.algos(120).valueOf() - algokit.algos(100).valueOf() + algokit.algos(110).valueOf() - algokit.microAlgos(1000).valueOf()
    if (chrisInfo.amount === chrisExpectedBalance) {
        console.log("크리스: 애플 비전 프로 잘 사고 앨리스한테 110 ALGO 받았다!")
    } else {
        console.log("크리스: 애플 비전 프로 못 샀거나 앨리스한테 110 ALGO 못 받았다 ㅠㅠ")  
    }

    // === 세 계정 정보 출력이 어떤 정보를 제공하는지 궁금하면 uncomment 후 실행해보세요! ===
    // console.log("Alice's Account:", await algorand.account.getInformation(alice.addr));
    // console.log("Bob's Account:", await algorand.account.getInformation(bob.addr));
    // console.log("Chris's Account:", await algorand.account.getInformation(chris.addr));
}
main()
import * as algokit from '@algorandfoundation/algokit-utils';

async function main() {
    // 로컬 네트워크로 연결된 알고랜드 클라이언트 생성
    // defaultLocalNet -> 로컬네트워크로 만들게~
    // testnet으로 할 경우 테스트넷, Mainnet 으로 하면 메인넷
    const algorand = algokit.AlgorandClient.defaultLocalNet();

    // 테스팅에 사용할 랜덤 계정 생성
    // 기본적으로 3개의 테스트 계정을 주지만, 랜덤으로 생성하면 편하긴함
    const alice = algorand.account.random();
    const bob = algorand.account.random();
    
    // 앨리스에게 디스팬서로부터 ALGO 지급하기
    // 디스펜서 = 개발하는데 사용하는 네트워크에서는 알고를 대량으로 보유하는 계정이 있음, 테스팅용 알고를 요청할 수 있음
    const dispenser = await algorand.account.dispenser();
    
    // payment를 통해 트랜잭션을 만들 수 있음
    // config -> 특정 조건을 추가하고 싶을 때 사용 -> 선택적
    await algorand.send.payment({
        sender: dispenser.addr,
        receiver: alice.addr,
        amount: algokit.algos(10),
    })

    // 앨리스가 밥에게 10 ALGO를 송금하면 성공할까?
    // 왜? -> 미니멈 밸런스가 없기 때문에 : 10개를 보내면 미니멈 밸런스 이하인 0 알고만 남음
    try {
        await algorand.send.payment({
            sender: alice.addr,
            receiver: bob.addr,
            amount: algokit.algos(9.899),
        })
        console.log("알고 보내기 성공!");
    } catch(e) {
        console.log(e)
    }

    // 앨리스랑 밥의 잔액 확인
    const aliceBalance = await algorand.account.getInformation(alice.addr);
    const bobBalance = await algorand.account.getInformation(bob.addr);
    console.log(`앨리스의 잔액: ${aliceBalance.amount} microAlgos   ${aliceBalance.amount / 1_000_000} Algos`)
    console.log(`밥의 잔액: ${bobBalance.amount} microAlgos   ${bobBalance.amount / 1_000_000} Algos`)
}
main()

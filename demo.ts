import * as algokit from '@algorandfoundation/algokit-utils';

async function main() {
    // 로컬 네트워크로 연결된 알고랜드 클라이언트 생성
    const algorand = algokit.AlgorandClient.defaultLocalNet();

    // 테스팅에 사용할 랜덤 계정 생성
    const alice = algorand.account.random();
    const bob = algorand.account.random();
    
    // 앨리스에게 디스팬서로부터 ALGO 지급하기
    const dispenser = await algorand.account.dispenser();
    
    await algorand.send.payment({
        sender: dispenser.addr,
        receiver: alice.addr,
        amount: algokit.algos(10),
    })

    // 앨리스가 밥에게 10 ALGO를 송금하면 성공할까?
    try {
        await algorand.send.payment({
            sender: alice.addr,
            receiver: bob.addr,
            amount: algokit.algos(9.89),
        })
        console.log("알고 보내기 성공!");
    } catch(e) {
        console.log(e)
    }
}
main()
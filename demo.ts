import * as algokit from "@algorandfoundation/algokit-utils";

async function main() {
  // 로컬 네트워크로 연결된 알고랜드 클라이언트 생성
  const algorand = algokit.AlgorandClient.defaultLocalNet(); //defaultLocalNet이 아니라 testnet으로 하고 싶으면 testnet으로 설정하면 됨.

  // 테스팅에 사용할 랜덤 계정 생성
  const alice = algorand.account.random();
  const bob = algorand.account.random();

  // 앨리스에게 디스팬서로부터 ALGO 지급하기
  const dispenser = await algorand.account.dispenser(); //faucet인 듯.

  await algorand.send.payment({
    sender: dispenser.addr,
    receiver: alice.addr,
    amount: algokit.algos(10),
  });

  // 앨리스가 밥에게 10 ALGO를 송금하면 성공할까? //이거는 안됨. minimum algo 아래로 내려가기 때문
  try {
    await algorand.send.payment({
      sender: alice.addr,
      receiver: bob.addr,
      amount: algokit.algos(10),
    });
    console.log("알고 보내기 성공!");
  } catch (e) {
    console.log(e);
  }

  // 앨리스랑 밥의 잔액 확인
  const aliceBalance = await algorand.account.getInformation(alice.addr);
  const bobBalance = await algorand.account.getInformation(bob.addr);
  console.log(
    `앨리스의 잔액: ${aliceBalance.amount} microAlgos   ${
      aliceBalance.amount / 1_000_000
    } Algos`
  );
  console.log(
    `밥의 잔액: ${bobBalance.amount} microAlgos   ${
      bobBalance.amount / 1_000_000
    } Algos`
  );
}
main();

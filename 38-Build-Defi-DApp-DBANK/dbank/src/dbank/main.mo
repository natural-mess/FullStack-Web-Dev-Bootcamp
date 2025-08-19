import Debug "mo:base/Debug";

actor DBank{
  stable var currentValue = 300;
  // currentValue := 100;
  // stable keyword keep currentValue persistent, variable becomes orthogonal persisted variable

  // constant variable
  let id = 123124124235;

  // Debug.print(debug_show(currentValue));
  // Debug.print(debug_show (id));

  public func topUp(amount: Nat) {
    currentValue += amount;
    Debug.print(debug_show (currentValue));
  };

  // Allow users to withdraw an amount from the currentValue
  // Decrease the currentValue by the amount
  public func withdraw(amount: Nat) {
    let tempValue: Int = currentValue - amount;
    if (tempValue >= 0) {
      currentValue -= amount;
      Debug.print(debug_show (currentValue));
    }
    else {
      Debug.print("Withdraw amount is bigger than current amount");
    }
  };

  public query func checkBalance(): async Nat {
    return currentValue;
  };

  // topUp();
};

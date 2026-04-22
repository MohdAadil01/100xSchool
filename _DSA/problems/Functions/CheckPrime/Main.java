package problems.Functions.CheckPrime;

import java.util.Scanner;

public class Main {

    public static boolean isPrime(int n) {
        for (int i = 1; i < n; i++) {
            if (n % i == 0 && i != 1) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        if (isPrime(n)) {
            System.out.print("Prime");
        } else {
            System.out.print("Not Prime");
        }

        sc.close();
    }
}

package problems.Functions.Factorial;

import java.util.Scanner;

public class Main {
    public static long factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        long res = 1;
        for (int i = 1; i <= n; i++) {
            res *= i;
        }
        return res;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        System.out.print(factorial(n));

        sc.close();
    }
}

package problems.Functions.nCr;

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

        int r = sc.nextInt();

        long ans = factorial(n) / (factorial(r) * factorial(n - r));

        System.out.println(ans);

        sc.close();
    }
}

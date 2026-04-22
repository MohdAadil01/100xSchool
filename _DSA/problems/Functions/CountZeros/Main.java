package problems.Functions.CountZeros;

import java.util.Scanner;

public class Main {
    public static int func(long n) {
        if (n == 0)
            return 1;
        int cnt = 0;
        while (n > 0) {
            if (n % 10 == 0) {
                cnt++;
            }
            n = n / 10;

        }
        return cnt;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();

        System.out.print(func(n));

        sc.close();
    }
}

package problems.ArrayTechniques.CountVowels;

import java.util.Scanner;

public class Main {

    public static boolean isVowel(char c) {
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            return true;
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine();
        String str = sc.nextLine();

        int[] prefixSum = new int[n];
        prefixSum[0] = isVowel(str.charAt(0)) ? 1 : 0;
        for (int i = 1; i < n; i++) {
            prefixSum[i] = prefixSum[i - 1] + (isVowel(str.charAt(i)) ? 1 : 0);
        }

        int q = sc.nextInt();
        for (int i = 0; i < q; i++) {
            int l = sc.nextInt();
            int r = sc.nextInt();
            l--;
            r--;
            int sum = 0;
            if (l == 0) {
                sum = prefixSum[r];
            } else {
                sum = prefixSum[r] - prefixSum[l - 1];
            }
            System.out.println(sum);
        }
        sc.close();
    }
}

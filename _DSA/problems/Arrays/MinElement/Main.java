package problems.Arrays.MinElement;

import java.util.Scanner;

public class Main {
    public static int[] input() {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        sc.close();

        return arr;
    }

    public static void getMinimum(int n, int[] arr) {
        int ans = arr[0];
        int index = 0;
        for (int i = 0; i < n; i++) {
            if (arr[i] < ans) {
                ans = arr[i];
                index = i;
            }
        }
        index++;
        System.out.print(ans + " " + index);
    }

    public static void main(String[] args) {
        int[] arr = input();
        getMinimum(arr.length, arr);
    }
}

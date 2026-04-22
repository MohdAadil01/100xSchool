package problems.Arrays.checkSorted;

import java.util.Scanner;

public class Main {

    public static int[] input(Scanner sc, int n) {
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        return arr;
    }

    public static boolean isSorted(int[] arr, int n) {
        for (int i = 1; i < n; i++) {
            if (arr[i - 1] > arr[i]) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = input(sc, n);

        if (isSorted(arr, n)) {
            System.out.print("YES");
        } else {
            System.out.print("NO");
        }
    }
}

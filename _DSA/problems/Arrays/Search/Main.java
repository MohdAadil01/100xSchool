package problems.Arrays.Search;

import java.util.*;

public class Main {

    public static void search(int el, int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == el) {
                System.out.print("YES");
                return;
            }
        }
        System.out.print("NO");
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int el = sc.nextInt();
        int arr[] = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        search(el, arr);

        sc.close();
    }
}
package problems.BS.SearchQueriesII;

import java.util.Scanner;

public class Main {
    public static int search(int[] arr, int x) {
        int low = 0;
        int high = arr.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] == x) {
                return mid;
            } else if (arr[mid] > x) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int q = sc.nextInt();
        int[] arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        for (int i = 0; i < q; i++) {
            int x = sc.nextInt();
            int res = (search(arr, x) == -1) ? -1 : search(arr, x) + 1;
            System.out.println(res);
        }

        sc.close();

    }
}

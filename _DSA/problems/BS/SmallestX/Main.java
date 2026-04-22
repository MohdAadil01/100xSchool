package problems.BS.SmallestX;

import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static int find(int[] arr, int x) {
        int ans = -1;
        int low = 0;
        int high = arr.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] <= x) {
                ans = arr[mid];
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int q = sc.nextInt();

        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        Arrays.sort(arr);

        for (int i = 0; i < q; i++) {
            int x = sc.nextInt();
            int ans = find(arr, x);

            System.out.println(ans);
        }

        sc.close();

    }
}

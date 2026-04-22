package problems.BS.FreqX;

import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static int countFirstOccurence(int[] arr, int x) {
        int low = 0;
        int high = arr.length - 1;
        int ans = -1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] >= x) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
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
            if (countFirstOccurence(arr, x) == -1) {
                System.out.println(0);
            } else {
                int ans = n - (countFirstOccurence(arr, x));
                System.out.println(ans);

            }
        }

        sc.close();
    }
}

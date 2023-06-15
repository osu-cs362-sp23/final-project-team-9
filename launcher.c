#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <stdlib.h>


int testRunner(void) {
    int choice;

    char input[10];
    printf("Press 1 to run integration tests\n");
    printf("Press 2 to run e2e tests\n");
    printf("Press 3 to run unit test - generate chart image\n");
    printf("Press 4 to run unit test - Sort points\n");
    printf("Press 5 to run unit test - Chart storage\n");
    printf("Press 6 to exit\n");

    for (int i = 0; i < 5; i++) {
        printf("\n");
    }

    printf("Your selection: ");
    scanf("%s", input);
    choice = atoi(input);

    switch (choice) {
        case 1:
            if (fork() == 0) {
                execlp("npm", "npm", "run", "test:integration", NULL);
                return 1;
            }
            break;
        case 2:
            if (fork() == 0) {
                execlp("npm", "npm", "run", "test:e2e", NULL);
                return 1;
            }
            break;
        case 3:
            if (fork() == 0) {
                execlp("npm", "npm", "run", "test:utgenChartImg", NULL);
                return 1;
            }
            break;
        case 4:
            if (fork() == 0) {
                execlp("npm", "npm", "run", "test:utSortPoints", NULL);
                return 1;
            }
            break;
        case 5:
            if (fork() == 0) {
                execlp("npm", "npm", "run", "test:utChartStorage", NULL);
                return 1;
            }
            break;
        case 6:
            return 0;
        default:
            printf("Incorrect input\n");
            return 1;
    }

    wait(NULL);
    return 1;
}

int main() {
    int res;

    while (1) {
        res = testRunner();
        if (res == 0) {
            break;
        }
    }

    return 0;
}


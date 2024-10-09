rowsList = []
rearrangedRowsList = []
resultRowsList = []
resultColumnsList = []
resultWord = ""
display = [
    ['a', 'b', 'c', 'd'],
    ['e', 'f', 'g', 'h'],
    ['i', 'j', 'k', 'l'],
    ['m', 'n', 'o', 'p'],
    ['q', 'r', 's', 't'],
    ['u', 'v', 'w', 'x'],
    ['y', 'z']
];
initialTable = [
    [0,['a', 'e', 'i', 'm', 'q', 'u', 'y']],
    [1,['b', 'f', 'j', 'n', 'r', 'v', 'z']],
    [2,['c', 'g', 'k', 'o', 's', 'w']],
    [3,['d', 'h', 'l', 'p', 't', 'x']]
];

print("I can Guess The Word in Our Mind!!!\nHow? Just Answer The Few Questions")
print("Let's Start The Game!!!")
NumberOfLetters = int(input("How Many Letter Are There In The Words: "))
print()

print("Columns\n1 2 3 4")
for ch in display:
    
    for c in ch:
        print(c, end=' ')
    print()
print()    



for i in range(NumberOfLetters):
    print("Enter the Column Number of the letter",i+1,":",end=" ")   
    n = int(input(""))
    rowsList.append(n-1)

for j in rowsList:
    rearrangedRowsList.append(initialTable[j][1])

print("Columns\n1 2 3 4 5 6 7") 
for ch in rearrangedRowsList:
    for c in ch:
        print(c, end=' ')
    print()
print()

for i in range(NumberOfLetters):
    print("Enter the Column Number of the letter",i+1,":",end=" ")
    n = int(input(" "))
    resultColumnsList.append(n-1)
    resultRowsList.append(n-1)


i = 0
for j in resultColumnsList:
    letter = rearrangedRowsList[i][j]
    resultWord += letter
    i += 1

print("\nSuprise!!! The Word on Your Mind Is",resultWord)
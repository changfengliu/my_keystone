通过 git fetch upstream 抽取官方更新。

## 第一步

git stash # 暂存修改（推荐）或
git add . # 添加所有修改
git commit -m "暂存本地修改" # 提交

## 第二步

git fetch upstream

## 第三步

git merge upstream/main

## 第四步

git stash pop

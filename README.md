This is a simple react + django + postgre sql react project todolist


To get started:
```bash
#Clone this repo
git clone https://github.com/sanjivthapasvt/todo.git 

# Change directory to todo/backend
cd todo/backend

# Create python virtual env and install packages in reqirements.txt
python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt

#Go to backend/settings.py and change database host and username according to your own and migrate after making changes
python manage.py migrate

#Then run python server
python manage.py runserver

#You are now done with python code and make sure the python code is running in background

#Now open another terminal window and navigate to todo/frontend

cd todo/frontend

#install npm package and run server

npm install

npm run server

# Congrats everything should be working now 

```
Make sure you run both python and npm simutenously otherwise it will not work!!

Fnyway enjoy and feel free to messsage me if you face issues you can contact me via 
email: thapasvt12@gmail.com

or just send message to my social link it should be available in my profile!!!
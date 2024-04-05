from django.contrib.auth.models import User
from cart.models import CartItem
from .models import Profile
from .serializers import ProfileSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.hashers import make_password


class CreatedUserApiView(APIView):
    def post(self, request):
        try:
            #data присваевает себе запросы данных
            data = request.data

            # Хеширование пароля
            password = data.get('password')
            hashed_password = password #make_password(password) можем указать для обеспечения безопастности потому что у нам нет htpps защиты а просто http

            # Создание пользователя
            user, created = User.objects.get_or_create(
                username=data.get('username'),
                email=data.get('email'),
                defaults={'password': hashed_password}
            )
            #делаем условия что если мы создаём то
            if created:
                # Устанавливаем пароль
                user.set_password(password)
                #сохраняем зашиврованный пороль. он нужен чтобы не украли данные
                user.save()

            #получаем или Создаем профиль. 
            profile, profile_created = Profile.objects.get_or_create(
                #user хранит в себе username, email, password по этому указываем его. а вот image нет по этому указываем вручную
                user=user,
                defaults={'image': data.get('image')}
            )

            # Сохранение данных в профиль
            if profile_created:
                profile.username = user.username
                profile.email = user.email
                profile.password = user.password
                profile.image = data.get('image')
                profile.save()

            # Аутентификация и вход пользователя
            user = authenticate(request, username=data.get('username'), password=password)
            # делаем условия что если пользователь совпадает с участком данных то есть данные совпадают то мы его регистрируем
            if user is not None:
                login(request, user)
            #пути для профиля и корзины
            profile_url = reverse('profile', kwargs={'username': user.username})
            cart_url = reverse('cart', kwargs={'username': user.username})
            #возвращаем в ответе действующий username это для редактирование. путь к профилю и корзине пользователя 
            #и в конце даём статус успешной регистрации то есть create
            return Response({'old_username': data.get('username'), 'profile': profile_url, 'cart': cart_url}, 
                            status=status.HTTP_201_CREATED)
        #обработка ошибок
        except Exception as e:
            return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#ВСЁ САМ ПИСАЛ ЕСЛИ ЧТО


#логин
class LoginUserApiView(APIView):
    def post(self, request):
        #получаем данные 
        data = request.data
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        #проверка авторизации
        user = authenticate(request, username=username, email=email , password=password)

        #если есть юзер то возвращаем его профиль --
        if user:
            login(request, user)

            profile_url = reverse('profile', kwargs={'username': user.username})
            cart_url = reverse('cart', kwargs={'username': user.username})
            return Response({'message': 'sing in успешно прошёл', 'profile_url': profile_url,
                            'cart_url': cart_url, 
                            'user': data.get('username'),'user_id': user.id,}, status=status.HTTP_200_OK)
        #возвращаем ошибку если нет такого пользователя
        else:
            return Response({'error': 'нет такого пользователя'}, status=status.HTTP_401_UNAUTHORIZED)


class ProfileUpdate(APIView):
    def put(self, request):
        try:
            # Получаем данные из запроса
            data = request.data
            old_username = data.get('old_username')
            new_username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            image = data.get('image')

            # Находим пользователя по старому имени пользователя
            user = get_object_or_404(User, username=old_username)

            # Обновляем данные пользователя
            user.username = new_username
            user.email = email
            if password:
                user.set_password(password)
            user.save()

            # Обновляем соответствующий профиль
            profile = get_object_or_404(Profile, user=user)
            if image:
                profile.image = image
            profile.save()
            CartItem.objects.filter(user=user).update(user=new_username)
            profile_url = reverse('profile', kwargs={'username': new_username})
            cart_url = reverse('cart', kwargs={'username': new_username})
            return Response({'message': 'Профиль успешно обновлен', 'profile_url': profile_url, 
                             'cart_url': cart_url, 'username_json': new_username}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#профиль
class ProfileDetail(APIView):
    #создаем переменную которая получает все объекты из Profile
    queryset = Profile.objects.all()
    #get запрос где мы возвращаем все данные пользователя
    def get(self, request, username):
        profile = get_object_or_404(self.queryset, user__username=username)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)





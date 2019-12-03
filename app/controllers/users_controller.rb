class UsersController < ApplicationController
  before_action :set_user, only: %i[index]
  def index
  end
  def edit
  end
  def new
    @user=User.new
    @group.users << current_user
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email,:introduce, :image)
  end

end
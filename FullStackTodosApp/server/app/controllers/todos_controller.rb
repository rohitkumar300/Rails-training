class TodosController < ApplicationController
  def index
    render json: Todo.all
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      render json: todo, status: :created
    else
      render json: todo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    deletetodo = Todo.find(params[:id])
    deletetodo.destroy
  end

  def edit
    edit_todo = Todo.find(params[:id])
  end

  def update
    edit_todo = Todo.find(params[:id])
    edit_todo.update(title: params[:title])
  end

  private

  def todo_params
    params.require(:todo).permit(:title)
  end
end

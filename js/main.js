$(document).ready(function () { 
    
    $('#searchUser').on('keyup',function (e) {
        let username = e.target.value;
        //make req
        $.ajax({
            url: 'https://api.github.com/users/' +username ,
            data:{
                client_id:'6d6596da19bca9123b42',
                client_secret: 'ad38a201f040107b6038cce3f5d79df6f64af259',
                
            }
        }).done(function (user) {
            $.ajax({
                url: 'https://api.github.com/users/' +username + '/repos',
                data:{
                    client_id:'6d6596da19bca9123b42',
                    client_secret: 'ad38a201f040107b6038cce3f5d79df6f64af259',
                    sort: 'created: asc',
                    per_page: 5
                }   
            }).done(function (repos) {
                $.each(repos, function (index, repo) {
                    $('#repos').append(`
                        <div class="card">
                            <div class="row">
                                <div class="col-md-6 ml-3">
                                    <strong>${repo.name}</strong> :  ${repo.description}
                                </div>
                                <div class="col-md-3">
                                <span class="badge  badge-warning">Forks: ${repo.forks_count}</span>
                                <span class="badge  badge-primary">Watchers: ${repo.watchers_count}</span>
                                <span class="badge  badge-success">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2 justify-content-end">
                                    <a href="${repo.html_url}" target="_blank"  class="btn btn-warning mr-1">Repo Page</a>

                                </div>
                            </div>
                        </div>
                    `);
                });

            });

            $('#profile').html(`
            <div class="card border-primary mb-3">
            <div class="card-header">
              <h3 class="">${user.name}</h3>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-3">
                <img class="img-thumbnail avatar" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
                </div>
                <div class="col-md-9">
                <span class="badge  badge-warning">Public Repos: ${user.public_repos}</span>
                <span class="badge  badge-primary">Public Gists: ${user.public_gists}</span>
                <span class="badge  badge-success">Followers: ${user.followers}</span>
                <span class="badge  badge-info">Following: ${user.following}</span>
                <br>
                <br>
                <ul class="list-group">
                    <li class="list-group-item">
                        Company: ${user.company}
                    </li>
                    <li class="list-group-item">
                    Website / Blog: ${user.blog}
                    </li>
                    <li class="list-group-item">
                    Location: ${user.location}
                    </li>
                    <li class="list-group-item">
                    Member Since: ${user.created_at}
                    </li>

                </ul>
                </div>
              </div>
            </div>
            <h3 class="page-header ml-2"> Latest Repos</h3>
            <div id="repos">

            </div>
            `);
        });
    })
 });
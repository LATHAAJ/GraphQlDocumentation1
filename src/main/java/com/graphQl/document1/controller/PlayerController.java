package com.graphQl.document1.controller;

import com.graphQl.document1.model.Player;
import com.graphQl.document1.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class PlayerController {
  private final PlayerService playerService;

  @QueryMapping
  public List<Player> findAll() {
    return playerService.findAll();
  }
}
